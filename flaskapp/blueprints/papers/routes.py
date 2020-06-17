import itertools

from flask import Blueprint
from flask import flash
from flask import jsonify
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from flask_login import login_required
from qpt_generator import QPTGenerator

from flaskapp.blueprints.papers.forms import MarkDistributionForm
from flaskapp.checkers import check_valid_course
from flaskapp.utils import json_url
from flaskapp.utils import profile_path

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
        css_file="css/base.css",
        css_file2="css/home.css",
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
        if data:
            data = json_url.dumps(data)
            return redirect(
                url_for("papers.mark_distribution_form",
                        course_id=course_id,
                        data=data))
        flash("Form can't be empty!")
    return render_template(
        "papers/generate_request.html",
        js_file="js/papers/generate_request.js",
        css_file="css/papers/generate_request.css",
        css_file2="css/base.css",
        image_file=profile_path(),
    )


@papers.route("/course/<course_id>/papers/generate/form/<data>",
              methods=["GET", "POST"])
@login_required
@check_valid_course
def mark_distribution_form(course_id, data):
    if not data:
        return redirect(
            url_for("papers.paper_generate_request", course_id=course_id))
    data = json_url.loads(data)
    form = MarkDistributionForm(course_id, data["questions"],
                                data["total_marks"])
    if form.validate_on_submit():
        question_no = list(
            itertools.chain(*map(lambda x: list(itertools.repeat(x[0] + 1, x[1])), enumerate(data["questions"]))))
        paper_template = QPTGenerator(dict(form.data), question_no).generate()
        return jsonify(paper_template)
    return render_template("papers/mark_distribution_form.html", form=form)


# Temporary route for paper tamplate in HTML
@papers.route("/Paper-to-PDF")
@login_required
def ptp():

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
        css_file="css/ptp.css",
        title="Paper-to-PDF",
        course_name=course_name,
        prefix=prefix,
        term=term,
        date=date,
        time_limit=time_limit,
        instructions=instructions,
        questions=questions,
    )
