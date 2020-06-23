import itertools
from collections import Counter
from collections import defaultdict
from string import ascii_lowercase

from flask import Blueprint
from flask import flash
from flask import jsonify
from flask import redirect
from flask import render_template
from flask import request
from flask import session
from flask import url_for
from flask_login import login_required
from qpt_generator import QPTGenerator

from flaskapp import db
from flaskapp.blueprints.papers.forms import MarkDistributionForm
from flaskapp.blueprints.papers.forms import PaperLogoForm
from flaskapp.blueprints.papers.utils import find_conflicting_questions
from flaskapp.blueprints.papers.utils import find_random_question
from flaskapp.blueprints.papers.utils import QuestionNotFoundError
from flaskapp.blueprints.papers.utils import save_logo
from flaskapp.checkers import check_valid_course
from flaskapp.checkers import check_valid_session
from flaskapp.models import Paper
from flaskapp.models import Question
from flaskapp.utils import CognitiveEnum
from flaskapp.utils import DifficultyEnum
from flaskapp.utils import json_url
from flaskapp.utils import profile_path
from flaskapp.utils import QuestionTypeEnum

papers = Blueprint("papers", __name__)


@papers.route("/home")
@login_required
def home():
    """Render Home page
    Returns:
        HTML -- It will render home page.
    """
    return render_template(
        "papers/home.html",
        css_files=["css/base.css", "css/home.css"],
        title="Home",
        image_file=profile_path(),
    )


@papers.route("/course/<course_id>/papers/generate/request", methods=["GET", "POST"])
@login_required
@check_valid_course
def paper_generate_request(course_id):
    """ generate paper from json data
    """
    if request.method == "POST":
        data = request.get_json()
        if data:
            session["total_marks"] = json_url.dumps(data["total_marks"])
            session["no_of_subquestions"] = json_url.dumps(data["questions"])
            return redirect(
                url_for("papers.mark_distribution_form", course_id=course_id,)
            )
        flash("Form can't be empty!")
    return render_template(
        "papers/generate_request.html",
        js_files=["js/papers/generate_request.js"],
        css_files=["css/papers/generate_request.css", "css/base.css"],
        image_file=profile_path(),
    )


@papers.route("/course/<course_id>/papers/generate/form/", methods=["GET", "POST"])
@login_required
@check_valid_course
@check_valid_session(session_keys=("total_marks", "no_of_subquestions"))
def mark_distribution_form(course_id):
    """Mark distribution of form
    Args:
        course_id (int): Course ID of course
    Returns:
        HTML: Go to mark distribution form page
    """
    total_marks = json_url.loads(session["total_marks"])
    no_of_subquestions = json_url.loads(session["no_of_subquestions"])
    form = MarkDistributionForm(course_id, no_of_subquestions, total_marks)
    if form.validate_on_submit():
        question_no = list(
            itertools.chain(
                *map(
                    lambda x: list(itertools.repeat(x[0] + 1, x[1])),
                    enumerate(no_of_subquestions),
                )
            )
        )
        raw_template = QPTGenerator(dict(form.data), question_no).generate()
        paper_template = defaultdict(lambda: defaultdict(dict))
        subque_counter = Counter()
        que_counter = defaultdict(dict)
        for i in range(len(raw_template["question_no"])):
            data = dict(
                mark=raw_template["question"][i],
                cognitive=CognitiveEnum(raw_template["cognitive"][i]).name,
                difficulty=DifficultyEnum(raw_template["difficulty"][i]).name,
                unit=raw_template["unit"][i],
            )
            question_type = QuestionTypeEnum(raw_template["question_type"][i]).name
            if raw_template["question_no"][i] not in que_counter[question_type]:
                que_counter[question_type][raw_template["question_no"][i]] = (
                    len(que_counter[question_type]) + 1
                )
            current_que = que_counter[question_type][raw_template["question_no"][i]]
            current_subque = ascii_lowercase[
                subque_counter[(question_type, current_que)]
            ]
            paper_template[question_type][current_que][current_subque] = data
            subque_counter[(question_type, current_que)] += 1
        session["paper_template"] = json_url.dumps(dict(paper_template))
        return redirect(url_for("papers.confirm_paper_template", course_id=course_id))
    return render_template(
        "papers/mark_distribution_form.html", form=form, title="Mark Distribution"
    )


@papers.route("/course/<course_id>/papers/confirm/template/", methods=["GET", "POST"])
@login_required
@check_valid_course
@check_valid_session(session_keys=("paper_template",))
def confirm_paper_template(course_id):
    if request.method == "POST":
        if request.get_json():
            return redirect(url_for("papers.generate_paper", course_id=course_id))
        flash("Form can't be empty!")
    paper_template = json_url.loads(session["paper_template"])
    return render_template(
        "papers/confirm_paper_template.html",
        course_id=course_id,
        paper_template=paper_template,
        css_files=["css/papers/confirm_paper_template.css"],
        js_files=["js/papers/confirm_paper_template.js"],
        image_file=profile_path(),
        title="Mark Distribution",
    )


@papers.route("/course/<course_id>/papers/generate/", methods=["GET", "POST"])
@login_required
@check_valid_course
@check_valid_session(session_keys=("paper_template", "total_marks"))
def generate_paper(course_id):
    paper_template = json_url.loads(session["paper_template"])
    conflicting_questions = []
    for qtype in paper_template:
        for question in paper_template[qtype]:
            for subquestion, constraints in paper_template[qtype][question].items():
                constraints["cognitive"] = CognitiveEnum.from_string(
                    constraints["cognitive"]
                )
                constraints["difficulty"] = DifficultyEnum.from_string(
                    constraints["difficulty"]
                )
                constraints["question_type"] = QuestionTypeEnum.from_string(qtype)
                conflicting_questions.extend(
                    find_conflicting_questions(course_id, constraints)
                )
                paper_template[qtype][question][subquestion] = constraints

    form = PaperLogoForm()
    form.process(request.form)
    if form.validate_on_submit():
        paper_data = {}
        if form.picture.data:
            paper_data["paper_logo"] = save_logo(form.picture.data)
        paper_data["name"] = form.name.data
        paper_data["term"] = form.term.data
        paper_data["mark"] = json_url.loads(session["total_marks"])
        paper_data["exam_date"] = form.exam_date.data
        paper_data["time_limit"] = form.time_limit.data
        paper_data["course_id"] = course_id
        paper_data["paper_format"] = {}
        for qtype in paper_template:
            for question in paper_template[qtype]:
                for subquestion, constraints in paper_template[qtype][question].items():
                    try:
                        paper_data["paper_format"].update(
                            dict(
                                qtype=dict(
                                    question=dict(
                                        subquestion=find_random_question(
                                            course_id, constraints
                                        )
                                    )
                                )
                            )
                        )
                    except QuestionNotFoundError:
                        flash(
                            "Question that satisfies all given constraints doesn't exist in database."
                        )
                        redirect(url_for("papers.home"))
        paper = Paper(**paper_data)
        db.session.add(paper)
        db.session.commit()
        return jsonify(paper_data)
    return render_template(
        "papers/generate_paper.html",
        conflicting_questions=conflicting_questions,
        course_id=course_id,
        form=form,
    )


@papers.route("/papers/handle/conflicts", methods=["GET", "POST"])
@login_required
def handle_conflicting_questions():
    # data = {"mcq":{"ask": [], "nask": []}, "sub": {"ask": [], "nask": []}}
    if request.method == "POST":
        data = request.get_json()
        for qtype in data:
            db.session.query(Question).filter(
                Question.id.in_(data[qtype].get("nask", []))
            ).update(dict(imp=False), synchronize_session="fetch")
            db.session.query(Question).filter(
                Question.id.in_(data[qtype].get("ask", []))
            ).update(dict(is_asked=False), synchronize_session="fetch")
            db.session.commit()
        return jsonify(dict(status="OK"))


@papers.route("/papers/html/<paper_id>")
@login_required
def html_paper(paper_id):
    """Create HTML paper
    Raises:
        your: Final paper
    Returns:
        PDF: Pdf of final paper
    """
    paper = Paper.query.filter_by(id=paper_id)

    return render_template(
        "papers/ptp.html", css_files=["css/ptp.css"], title="Paper-to-PDF", paper=paper,
    )
