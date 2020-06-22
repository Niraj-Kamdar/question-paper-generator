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
        css_files=["css/base.css","css/home.css"],
        title="Home",
        image_file=profile_path(),
    )


@papers.route("/course/<course_id>/papers/generate/request",
              methods=["GET", "POST"])
@login_required
@check_valid_course
def paper_generate_request(course_id):
    """ generate paper from json data
    """
    if request.method == "POST":
        data = request.get_json()
        print(data)
        if data:
            session["total_marks"] = json_url.dumps(data["total_marks"])
            session["no_of_subquestions"] = json_url.dumps(data["questions"])
            return redirect(
                url_for(
                    "papers.mark_distribution_form",
                    course_id=course_id,
                ))
        flash("Form can't be empty!")
    return render_template(
        "papers/generate_request.html",
        js_files=["js/papers/generate_request.js"],
        css_files=["css/papers/generate_request.css","css/base.css"],
        image_file=profile_path(),
    )


@papers.route("/course/<course_id>/papers/generate/form/",
              methods=["GET", "POST"])
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
            itertools.chain(*map(
                lambda x: list(itertools.repeat(x[0] + 1, x[1])),
                enumerate(no_of_subquestions),
            )))
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
            question_type = QuestionTypeEnum(
                raw_template["question_type"][i]).name
            if raw_template["question_no"][i] not in que_counter[
                    question_type]:
                que_counter[question_type][raw_template["question_no"][i]] = (
                    len(que_counter[question_type]) + 1)
            current_que = que_counter[question_type][
                raw_template["question_no"][i]]
            current_subque = ascii_lowercase[subque_counter[(question_type,
                                                             current_que)]]
            paper_template[question_type][current_que][current_subque] = data
            subque_counter[(question_type, current_que)] += 1
        session["paper_template"] = json_url.dumps(dict(paper_template))
        return redirect(
            url_for("papers.confirm_paper_template", course_id=course_id))
    return render_template("papers/mark_distribution_form.html", form=form)


@papers.route("/course/<course_id>/papers/confirm/template/",
              methods=["GET", "POST"])
@login_required
@check_valid_course
@check_valid_session(session_keys=("paper_template", ))
def confirm_paper_template(course_id):
    if request.method == "POST":
        if request.get_json():
            return redirect(
                url_for("papers.generate_paper", course_id=course_id))
        flash("Form can't be empty!")
    paper_template = json_url.loads(session["paper_template"])
    return render_template("papers/confirm_paper_template.html",
                           course_id=course_id,
                           paper_template=paper_template,
                           css_files=["/css/papers/confirm_paper_template.css"],
                           js_files=["/js/papers/confirm_paper_template.js"],
                           image_file=profile_path())


@papers.route("/course/<course_id>/papers/generate/",methods=["GET", "POST"])
@login_required
@check_valid_course
@check_valid_session(session_keys=("paper_template", "total_marks"))
def generate_paper(course_id):
    paper_template = json_url.loads(session["paper_template"])
    conflicting_questions = []
    for qtype in paper_template:
        for question in paper_template[qtype]:
            for subquestion, constraints in paper_template[qtype][
                    question].items():
                constraints["cognitive"] = CognitiveEnum.from_string(
                    constraints["cognitive"])
                constraints["difficulty"] = DifficultyEnum.from_string(
                    constraints["difficulty"])
                constraints["question_type"] = QuestionTypeEnum.from_string(
                    qtype)
                conflicting_questions.extend(
                    find_conflicting_questions(course_id, constraints))
                paper_template[qtype][question][subquestion] = constraints

    form = PaperLogoForm()
    form.process(request.form)
    print(form.validate_on_submit(),request.form,form._fields)
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
                for subquestion, constraints in paper_template[qtype][
                        question].items():
                    paper_data["paper_format"].update(
                        dict(qtype=dict(question=dict(
                            subquestion=find_random_question(
                                course_id, constraints)))))
        paper = Paper(**paper_data)
        db.session.add(paper)
        db.session.commit()
        return jsonify(paper_data)
    return render_template(
        "papers/generate_paper.html",
        conflicting_questions=conflicting_questions,
        course_id = course_id,
        form = form
    )


@papers.route("/papers/handle/conflicts", methods=["GET", "POST"])
@login_required
def handle_conflicting_questions():
    # data = {"mcq":{"ask": [], "nask": []}, "sub": {"ask": [], "nask": []}}
    if request.method == "POST":
        data = request.get_json()
        for qtype in data:
            db.session.query(Question).filter(
                Question.id.in_(data[qtype].get("nask", []))).update(
                    dict(imp=False), synchronize_session="fetch")
            db.session.query(Question).filter(
                Question.id.in_(data[qtype].get("ask", []))).update(
                    dict(is_asked=False), synchronize_session="fetch")
            db.session.commit()
        return jsonify(dict(status="OK"))


# Temporary route for paper template in HTML
@papers.route("/Paper-to-PDF")
@login_required
def ptp():
    """Convert Paper to pdf format
    Raises:
        your: Final paper
    Returns:
        PDF: Pdf of final paper
    """
    course_name = "Software Engineering"
    prefix = "Final"
    term = "Autumn 2020"
    date = "15th July, 2020"
    time_limit = "2 hours 30 minuts"
    instructions = [
        "Write your name and student number in the space provided.",
        "Make sure your mobile phone is switched off and place it at the front together with any bags, books, coats etc. Then find your seat.",
        "Remember that talking is not allowed at any time in the exam hall.",
        "Listen carefully to instructions. Students are required to comply with the instructions of invigilators at all times.",
        "You are not permitted to share stationery, calculators or any other materials during the examination.",
        "If you have a question or need more papers, raise your hand and a teacher will come to you. Teachers will not give hints or answers, so please do not ask for them.",
        "Stop writing immediately when the teacher says it is the end of the exam.",
        "Leave the exam hall quickly and quietly. Remember to take all your belongings with you.",
        "(Remember to collect all your belongings from holding rooms.) You must remain silent until after you have exited the building.",
        "Remember! Any form of cheating is not allowed and action will be taken.",
    ]

    questions = {
        1: {
            "question":
            "A quantity of air has a pressure, temprature and volume of 104 kPa, 38 °C and 0.03 m3, respectively. The tempreture of the air is raised by following to ways, for each of the above cases calculate the final tempreture, work requirement, change in internal energy and heat requirement.",
            "marks":
            10,
            "sub_questions": [
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
            ],
        },
        2: {
            "question":
            "A quantity of air has a pressure, temprature and volume of 104 kPa, 38 °C and 0.03 m3, respectively. The tempreture of the air is raised by following to ways, for each of the above cases calculate the final tempreture, work requirement, change in internal energy and heat requirement.",
            "marks":
            15,
            "sub_questions": [
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
            ],
        },
        3: {
            "question":
            "A quantity of air has a pressure, temprature and volume of 104 kPa, 38 °C and 0.03 m3, respectively. The tempreture of the air is raised by following to ways, for each of the above cases calculate the final tempreture, work requirement, change in internal energy and heat requirement.",
            "marks":
            18,
            "sub_questions": [
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
            ],
        },
        4: {
            "question":
            "A quantity of air has a pressure, temprature and volume of 104 kPa, 38 °C and 0.03 m3, respectively. The tempreture of the air is raised by following to ways, for each of the above cases calculate the final tempreture, work requirement, change in internal energy and heat requirement.",
            "marks":
            10,
            "sub_questions": [
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
            ],
        },
        5: {
            "question":
            "A quantity of air has a pressure, temprature and volume of 104 kPa, 38 °C and 0.03 m3, respectively. The tempreture of the air is raised by following to ways, for each of the above cases calculate the final tempreture, work requirement, change in internal energy and heat requirement.",
            "marks":
            15,
            "sub_questions": [
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
            ],
        },
        6: {
            "question":
            "A quantity of air has a pressure, temprature and volume of 104 kPa, 38 °C and 0.03 m3, respectively. The tempreture of the air is raised by following to ways, for each of the above cases calculate the final tempreture, work requirement, change in internal energy and heat requirement.",
            "marks":
            18,
            "sub_questions": [
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
                "Heating at constant volume until the pressure is 208 kPa",
                "Polytropic compression to 0.006 m3, where n = 1.6",
            ],
        },
    }

    return render_template(
        "papers/ptp.html",
        css_files=["css/ptp.css"],
        title="Paper-to-PDF",
        course_name=course_name,
        prefix=prefix,
        term=term,
        date=date,
        time_limit=time_limit,
        instructions=instructions,
        questions=questions,
    )