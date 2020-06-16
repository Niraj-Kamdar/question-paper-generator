from flask import Blueprint
from flask import flash
from flask import render_template
from flask import request
from flask import url_for
from flask_login import current_user
from flask_login import login_required
from werkzeug.utils import redirect

from flaskapp import db
from flaskapp.blueprints.courses.forms import CourseForm
from flaskapp.blueprints.courses.forms import UnitForm
from flaskapp.checkers import check_valid_course
from flaskapp.models import Course
from flaskapp.models import Unit
from flaskapp.utils import profile_path

courses = Blueprint("courses", __name__)


@courses.route("/course/new/", methods=["GET", "POST"])
@login_required
def add_course():
    """Rendering to add course page

    Returns:
        HTML function -- For adding new course to user's account. After submitting new course redirect to courses page.Else show form which
        shows add course feild.
    """
    form = CourseForm()
    if form.validate_on_submit():
        _course = Course(name=form.course.data, teacher=current_user)
        db.session.add(_course)
        db.session.commit()
        flash("New course added successfully!", "success")
        return redirect(url_for("courses.all_courses"))
    return render_template(
        "questions/course_form.html",
        form=form,
        css_file="css/base.css",
        css_file2="css/questions/courses_form.css",
        js_file="js/questions/add_course.js",
        image_file=profile_path(),
        title="Add Courses",
    )


@courses.route("/course/")
@login_required
def all_courses():
    """Show listed down course of user

    Returns:
        HTML function -- Redirect to courses pages where listed down all courses.
    """
    _courses = Course.query.filter(Course.teacher == current_user).all()
    return render_template(
        "questions/courses.html",
        courses=_courses,
        css_file="css/base.css",
        css_file2="css/questions/courses.css",
        image_file=profile_path(),
        title="Courses",
    )


@courses.route("/course/delete/", methods=["GET", "POST"])
@login_required
def remove_course():
    if request.method == "POST":
        course_ids = request.get_json()
        db.session.query(Course).filter(
            Course.id.in_(course_ids)).delete(synchronize_session="fetch")
        db.session.commit()


@courses.route("/course/<course_id>/unit/")
@login_required
@check_valid_course
def all_units(course_id):
    _course = Course.query.filter(Course.id == course_id).first()
    _units = Unit.query.filter(Unit.course == _course).all()
    return render_template(
        "questions/units.html",
        image_file=profile_path(),
        units=_units,
        title="Units",
        css_file="css/base.css",
        css_file2="css/questions/courses.css",
    )


@courses.route("/course/<course_id>/unit/new", methods=["GET", "POST"])
@login_required
@check_valid_course
def add_unit(course_id):
    _course = Course.query.filter(Course.id == course_id).first()
    form = UnitForm(_course)
    if form.validate_on_submit():
        unit = Unit(chapter_no=form.chapter_no.data,
                    name=form.name.data,
                    course=_course)
        db.session.add(unit)
        db.session.commit()
        flash("New unit added successfully!", "success")
        return redirect(url_for("courses.all_units", course_id=course_id))
    return render_template(
        "questions/unit_form.html",
        form=form,
        css_file="css/base.css",
        css_file2="css/questions/courses_form.css",
        js_file="js/questions/add_unit.js",
        image_file=profile_path(),
        title="Add Units",
    )


@courses.route("/course/<course_id>/unit/delete/", methods=["GET", "POST"])
@login_required
@check_valid_course
def remove_unit(course_id):
    if request.method == "POST":
        unit_ids = request.get_json()
        db.session.query(Course).filter(
            Unit.id.in_(unit_ids)).delete(synchronize_session="fetch")
        db.session.commit()
