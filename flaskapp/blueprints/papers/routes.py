from flask import Blueprint
from flask import flash
from flask import jsonify
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from flask_login import login_required

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


@papers.route("/course/<course_id>/papers/generate/request", methods=["GET", "POST"])
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
                url_for("papers.mark_distribution_form", course_id=course_id, data=data)
            )
        flash("Form can't be empty!")
    return render_template(
        "papers/generate_request.html",
        js_file="js/papers/generate_request.js",
        css_file="css/papers/generate_request.css",
        css_file2="css/base.css",
        image_file=profile_path(),
    )


@papers.route(
    "/course/<course_id>/papers/generate/form/<data>", methods=["GET", "POST"]
)
@login_required
@check_valid_course
def mark_distribution_form(course_id, data):
    if not data:
        return redirect(url_for("papers.paper_generate_request", course_id=course_id))
    data = json_url.loads(data)
    form = MarkDistributionForm(course_id, data["questions"], data["total_marks"])
    if form.validate_on_submit():
        return jsonify(form.data)
    return render_template("papers/mark_distribution_form.html", form=form)
