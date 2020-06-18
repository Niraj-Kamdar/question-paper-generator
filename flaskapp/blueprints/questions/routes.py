from flask import Blueprint, flash, render_template, request
from flask_login import current_user, login_required
from flaskapp import db
from flaskapp.blueprints.questions.forms import MCQQuestionForm, QuestionForm
from flaskapp.blueprints.questions.utils import (add_question_to_db,
                                                 delete_question_from_db,
                                                 redirect_to_all_questions,
                                                 update_imp_in_db,
                                                 update_question_in_db)
from flaskapp.checkers import (check_valid_course, check_valid_question_type,
                               check_valid_unit)
from flaskapp.models import Course, Question
from flaskapp.utils import QuestionTypeEnum, profile_path
from sqlalchemy import and_

questions = Blueprint("questions", __name__)


@questions.route("/course/<course_id>/unit/<unit_id>/question/<qtype>/")
@login_required
@check_valid_course
@check_valid_unit
@check_valid_question_type
def all_questions(course_id, unit_id, qtype):
    """Rendering Question page

    Arguments:
        course_id {Object} -- Id for course
        qtype {Subjective/mcq} -- Specification about question is subjective or MCQ type

    Returns:
        HTML Function -- According to chosen type of question render page
    """
    main_page = request.args.get("page", 1, type=int)
    _courses = Course.query.filter(Course.teacher == current_user).all()
    _questions = Question.query.filter(
        and_(
            Question.unit_id == unit_id,
            Question.question_type == QuestionTypeEnum.from_string(qtype),
        )
    ).paginate(page=main_page, per_page=1)
    common_args = dict(
        courses=_courses,
        course_id=course_id,
        unit_id=unit_id,
        qtype=qtype,
        image_file=profile_path(),
    )
    if qtype == "mcq":
        return render_template(
            "questions/mcq_questions.html",
            questions=_questions,
            css_files=[
                "css/base.css",
                "css/questions/mcqs.css",
                "css/questions/sideNav.css",
                "css/questions/questions.css",
                "css/questions/mcq_form.css",
                "css/questions/question_form.css",
            ],
            js_files=["js/questions/update_mcq_question.js", "js/sideNav.js"],
            title="Objective Questions",
            **common_args,
        )
    else:
        return render_template(
            "questions/questions.html",
            questions=_questions,
            css_file=[
                "css/base.css",
                "css/questions/questions.css",
                "css/questions/sideNav.css",
                "css/questions/question_form.css",
            ],
            js_files=["js/questions/update_question.js", "js/sideNav.js",],
            title="Subjective Questions",
            **common_args,
        )


@questions.route(
    "/course/<course_id>/unit/<unit_id>/question/<qtype>/new/", methods=["GET", "POST"],
)
@login_required
@check_valid_course
@check_valid_unit
@check_valid_question_type
def add_question(course_id, unit_id, qtype):
    """Adding question

    Arguments:
        course_id {Object} -- Course ID which uniquely defined.
        question_type {Subjective/MCQ} -- What is the type of question ? subjective or MCQ

    Returns:
        HTML function -- If the course instructor is not user than it will throw error 403 then
        according to type of question eg : if type is MCQ then difficulty, mark, options, IMP flag
        and if type is subjective then difficulty,mark,IMP flag added with question to the database
        and will add to UI and list down on screen.
    """
    _courses = Course.query.filter(Course.teacher == current_user).all()
    common_args = dict(
        courses=_courses,
        course_id=course_id,
        unit_id=unit_id,
        qtype=qtype,
        image_file=profile_path(),
    )
    if qtype == "mcq":
        form = MCQQuestionForm()
        if form.validate_on_submit():
            question = dict(
                question=form.question.data,
                option1=form.option1.data,
                option2=form.option2.data,
                option3=form.option3.data,
                option4=form.option4.data,
            )
            flash("New question added successfully!", "success")
            add_question_to_db(form, question, unit_id, qtype)
            return redirect_to_all_questions(course_id, unit_id, qtype)
        return render_template(
            "questions/mcq_question_form.html",
            form=form,
            css_files=[
                "css/base.css",
                "css/questions/mcq_form.css",
                "css/questions/sideNav.css",
                "css/questions/question_form.css",
            ],
            js_files=["js/questions/mcq_question_form.js", "js/sideNav.js"],
            title="Add Objective Question",
            **common_args,
        )
    else:
        form = QuestionForm()
        if form.validate_on_submit():
            question = dict(question=form.question.data)
            flash("New question added successfully!", "success")
            add_question_to_db(form, question, unit_id, qtype)
            return redirect_to_all_questions(course_id, unit_id, qtype)
        return render_template(
            "questions/question_form.html",
            form=form,
            css_files=[
                "css/base.css",
                "css/questions/question_form.css",
                "css/questions/sideNav.css",
            ],
            js_files=["js/questions/question_form.js", "js/sideNav.js"],
            title="Add Subjective Question",
            **common_args,
        )


@questions.route(
    "/course/<course_id>/unit/<unit_id>/question/<qtype>/update/<int:question_id>/",
    methods=["GET", "POST"],
)
@login_required
@check_valid_course
@check_valid_unit
@check_valid_question_type
def update_question(course_id, unit_id, qtype, question_id):
    """For updating question

    Returns:
        Render template -- for updating questions if that question is exist then update it by id.And update marks , difficulty and IMP flag accorging to input.
       And do changes in database accordingly.
    """
    common_args = dict(
        course_id=course_id, unit_id=unit_id, qtype=qtype, image_file=profile_path(),
    )
    _question = db.session.query(Question).filter_by(id=question_id).first()
    if _question is None:
        flash(f"Question:{question_id} Does not exist", "Failure")
        return redirect_to_all_questions(course_id, unit_id, qtype)
    data = _question.to_dict()
    data.update(_question.question)
    if qtype == "mcq":
        form = MCQQuestionForm(**data)
        if form.validate_on_submit():
            _question.question["question"] = form.question.data
            _question.question["option1"] = form.option1.data
            _question.question["option2"] = form.option2.data
            _question.question["option3"] = form.option3.data
            _question.question["option4"] = form.option4.data
            update_question_in_db(form, _question, qtype)
            flash(f"Question:{question_id} updated successfully!", "success")
            return redirect_to_all_questions(course_id, unit_id, qtype)
        return render_template(
            "questions/mcq_question_form.html",
            form=form,
            css_files=["css/questions/question_form.css"],
            js_files=["js/questions/question_form.js"],
            **common_args,
        )
    else:
        form = QuestionForm(**data)
        if form.validate_on_submit():
            _question.question["question"] = form.question.data
            update_question_in_db(form, _question, qtype)
            flash(f"Question:{question_id} updated successfully!", "success")
            return redirect_to_all_questions(course_id, unit_id, qtype)
        return render_template(
            "questions/question_form.html",
            form=form,
            css_files=["css/questions/question_form.css"],
            js_files=["js/questions/question_form.js"],
            **common_args,
        )


@questions.route(
    "/course/<course_id>/unit/<unit_id>/question/<qtype>/imp/", methods=["GET", "POST"]
)
@login_required
@check_valid_course
@check_valid_unit
@check_valid_question_type
def imp_question(course_id, unit_id, qtype):
    """Set an IMP flag to question

    Returns:
        Same page with flag or without flag -- set an IMP flag to particular question.And do changes in database also.
    """
    if request.method == "POST":
        update_imp_in_db(request.get_json())
        return redirect_to_all_questions(course_id, unit_id, qtype)


@questions.route(
    "/course/<course_id>/unit/<unit_id>/question/<qtype>/delete/",
    methods=["GET", "POST"],
)
@login_required
@check_valid_course
@check_valid_unit
@check_valid_question_type
def delete_question(course_id, unit_id, qtype):
    """Delete question

    Returns:
        page -- If current user is not an instructor of that subject then throw erroe else
        delete question's data. and update UI.
    """
    if request.method == "POST":
        delete_question_from_db(request.get_json())
        return redirect_to_all_questions(course_id, unit_id, qtype)
