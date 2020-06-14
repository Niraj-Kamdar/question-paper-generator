from flask import Blueprint
from flask import flash
from flask import json
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from flask_login import current_user
from flask_login import login_required

from flaskapp import db
from flaskapp.blueprints.questions.forms import CourseForm
from flaskapp.blueprints.questions.forms import MCQQuestionForm
from flaskapp.blueprints.questions.forms import QuestionForm
from flaskapp.blueprints.questions.forms import UnitForm
from flaskapp.blueprints.questions.utils import check_valid_course
from flaskapp.blueprints.questions.utils import check_valid_question_type
from flaskapp.blueprints.questions.utils import check_valid_unit
from flaskapp.blueprints.questions.utils import update_imp
from flaskapp.models import Course
from flaskapp.models import MCQQuestion
from flaskapp.models import Question
from flaskapp.models import Unit
from flaskapp.utils import CognitiveLevel
from flaskapp.utils import DifficultyLevel
from flaskapp.utils import profile_path

questions = Blueprint("questions", __name__)


@questions.route("/course/new/", methods=["GET", "POST"])
@login_required
def add_course():
    """Rendering to add course page

    Returns:
        HTML function -- For adding new course to user's account. After submitting new course redirect to courses page.Else show form which
        shows add course feild.
    """
    form = CourseForm()
    if form.validate_on_submit():
        course = Course(name=form.course.data, teacher=current_user)
        db.session.add(course)
        db.session.commit()
        flash("New course added successfully!", "success")
        return redirect(url_for("questions.courses"))
    return render_template(
        "questions/course_form.html",
        form=form,
        css_file="css/base.css",
        css_file2="css/questions/courses_form.css",
        js_file="js/questions/add_course.js",
        image_file=profile_path(),
        title="Add Courses",
    )


@questions.route("/course/")
@login_required
def courses():
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


@questions.route("/course/<course_id>/unit/")
@login_required
@check_valid_course
def units(course_id):
    _course = Course.query.filter(Course.id == course_id).first()
    _units = Unit.query.filter(Unit.course == _course).all()
    return render_template(
        "questions/units.html",
        image_file=profile_path(),
        units=_units,
        title="Units",
        css_file="css/base.css",
        css_file2="css/questions/courses.css",
        course_id = course_id
    )


@questions.route("/course/<course_id>/unit/new", methods=["GET", "POST"])
@login_required
@check_valid_course
def add_unit(course_id):
    form = UnitForm()
    _course = Course.query.filter(Course.id == course_id).first()
    if form.validate_on_submit():
        unit = Unit(chapter_no=form.chapter_no.data,
                    name=form.name.data,
                    course=_course)
        db.session.add(unit)
        db.session.commit()
        flash("New unit added successfully!", "success")
        return redirect(url_for("questions.units", course_id=course_id))
    return render_template(
        "questions/unit_form.html",
        form=form,
        css_file="css/base.css",
        css_file2="css/questions/courses_form.css",
        js_file="js/questions/add_unit.js",
        image_file=profile_path(),
        title="Add Units",
        course_id=course_id
    )


@questions.route("/course/<course_id>/unit/<unit_id>/question/<qtype>/")
@login_required
@check_valid_course
@check_valid_unit
@check_valid_question_type
def question(course_id, unit_id, qtype):
    """Rendering Question page

    Arguments:
        course_id {Object} -- Id for course
        qtype {Subjective/mcq} -- Specification about question is subjective or MCQ type

    Returns:
        HTML Function -- According to choosen type of question render page
    """
    _courses = Course.query.filter(Course.teacher == current_user).all()
    main_page = request.args.get("page", 1, type=int)
    if qtype == "mcq":
        _mcq_questions = MCQQuestion.query.filter(
            MCQQuestion.unit_id == unit_id).paginate(page=main_page,
                                                     per_page=1)
        return render_template(
            "questions/mcq_questions.html",
            questions=_mcq_questions,
            courses=_courses,
            course_id=course_id,
            unit_id=unit_id,
            qtype=qtype,
            css_file="css/base.css",
            css_file2="css/questions/mcqs.css",
            css_file3="css/questions/sideNav.css",
            css_file4="css/questions/questions.css",
            css_file5="css/questions/mcq_form.css",
            css_file6="css/questions/question_form.css",
            js_file="js/questions/update_mcq_question.js",
            js_file2="js/sideNav.js",
            image_file=profile_path(),
            title="Objective Questions",
        )
    else:
        _questions = Question.query.filter(
            Question.unit_id == unit_id).paginate(page=main_page, per_page=1)
        return render_template(
            "questions/questions.html",
            questions=_questions,
            courses=_courses,
            course_id=course_id,
            unit_id=unit_id,
            qtype=qtype,
            css_file="css/base.css",
            css_file2="css/questions/questions.css",
            css_file3="css/questions/sideNav.css",
            css_file4="css/questions/question_form.css",
            js_file="js/questions/update_question.js",
            js_file2="js/sideNav.js",
            image_file=profile_path(),
            title="Subjective Questions",
        )


@questions.route("/course/<course_id>/unit/<unit_id>/question/<qtype>/new/",
                 methods=["GET", "POST"])
@login_required
@check_valid_course
@check_valid_unit
@check_valid_question_type
def add_question(course_id, unit_id, qtype):
    """Adding question

    Arguments:
        course_id {Object} -- Course ID which uniquley defined.
        qtype {Subjective/MCQ} -- What is the type of question ? subjective or MCQ

    Returns:
        HTML function -- If the course instructor is not user than it will throw error 403 then
        according to type of question eg : if type is MCQ then difficulty, mark, options, IMP flag
        and if type is subjective then difficulty,mark,IMP flag added with question to the database
        and will add to UI and listdown on screen.
    """
    _courses = Course.query.filter(Course.teacher == current_user).all()
    if qtype == "mcq":
        form = MCQQuestionForm()
        if form.validate_on_submit():
            _question = MCQQuestion(
                question=form.question.data,
                mark=form.mark.data,
                difficulty=DifficultyLevel(form.difficulty.data),
                cognitive_level=CognitiveLevel(form.cognitive_level.data),
                imp=form.imp.data,
                option1=form.option1.data,
                option2=form.option2.data,
                option3=form.option3.data,
                option4=form.option4.data,
                unit_id=unit_id,
            )
            db.session.add(_question)
            db.session.commit()
            flash("New question added successfully!", "success")
            return redirect(
                url_for(
                    "questions.question",
                    qtype="mcq",
                    course_id=course_id,
                    unit_id=unit_id,
                ))
        return render_template(
            "questions/mcq_question_form.html",
            form=form,
            courses=_courses,
            course_id=course_id,
            unit_id=unit_id,
            qtype=qtype,
            css_file="css/base.css",
            css_file2="css/questions/mcq_form.css",
            css_file3="css/questions/sideNav.css",
            css_file4="css/questions/question_form.css",
            js_file="js/questions/mcq_question_form.js",
            js_file2="js/sideNav.js",
            image_file=profile_path(),
            title="Add Objective Question",
        )
    else:
        form = QuestionForm()
        if form.validate_on_submit():
            _question = Question(
                question=form.question.data,
                mark=form.mark.data,
                difficulty=DifficultyLevel(form.difficulty.data),
                cognitive_level=CognitiveLevel(form.cognitive_level.data),
                imp=form.imp.data,
                unit_id=unit_id,
            )
            db.session.add(_question)
            db.session.commit()

            flash("New question added successfully!", "success")
            return redirect(
                url_for(
                    "questions.question",
                    qtype="sub",
                    course_id=course_id,
                    unit_id=unit_id,
                ))

        return render_template(
            "questions/question_form.html",
            form=form,
            courses=_courses,
            course_id=course_id,
            unit_id=unit_id,
            qtype=qtype,
            css_file="css/base.css",
            css_file2="css/questions/question_form.css",
            css_file3="css/questions/sideNav.css",
            js_file="js/questions/question_form.js",
            js_file2="js/sideNav.js",
            image_file=profile_path(),
            title="Add Subjective Question",
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
    if qtype == "mcq":
        _question = db.session.query(MCQQuestion).filter_by(
            id=question_id).first()
        if _question is None:
            flash(f"Question:{question_id} Does not exist", "Failure")
            return redirect(
                url_for(
                    "questions.question",
                    qtype=qtype,
                    course_id=course_id,
                    unit_id=unit_id,
                ))
        form = MCQQuestionForm(**_question.to_dict())
        if form.validate_on_submit():
            _question.question = form.question.data
            _question.mark = form.mark.data
            _question.difficulty = DifficultyLevel(form.difficulty.data)
            _question.cognitive_level = CognitiveLevel(
                form.cognitive_level.data)
            _question.imp = form.imp.data
            _question.option1 = form.option1.data
            _question.option2 = form.option2.data
            _question.option3 = form.option3.data
            _question.option4 = form.option4.data
            db.session.commit()
            flash(f"Question:{question_id} updated successfully!", "success")
            return redirect(
                url_for(
                    "questions.question",
                    qtype=qtype,
                    course_id=course_id,
                    unit_id=unit_id,
                ))
        return render_template(
            "questions/mcq_question_form.html",
            form=form,
            qtype=qtype,
            course_id=course_id,
            unit_id=unit_id,
            css_file="css/questions/question_form.css",
            js_file="js/questions/question_form.js",
        )
    else:
        _question = db.session.query(Question).filter_by(
            id=question_id).first()
        if _question is None:
            flash(f"Question:{question_id} Does not exist", "Failure")
            return redirect(
                url_for(
                    "questions.question",
                    qtype="sub",
                    course_id=course_id,
                    unit_id=unit_id,
                ))
        form = QuestionForm(**_question.to_dict())
        if form.validate_on_submit():
            _question.question = form.question.data
            _question.mark = form.mark.data
            _question.difficulty = DifficultyLevel(form.difficulty.data)
            _question.cognitive_level = CognitiveLevel(
                form.cognitive_level.data)
            _question.imp = form.imp.data
            db.session.commit()
            flash(f"Question:{question_id} updated successfully!", "success")
            return redirect(
                url_for(
                    "questions.question",
                    qtype="sub",
                    course_id=course_id,
                    unit_id=unit_id,
                ))
        return render_template(
            "questions/question_form.html",
            form=form,
            qtype=qtype,
            course_id=course_id,
            unit_id=unit_id,
            css_file="css/questions/question_form.css",
            js_file="js/questions/question_form.js",
        )


@questions.route(
    "/course/<course_id>/unit/<unit_id>/question/<qtype>/imp/<impq>/",
    methods=["GET"])
@login_required
@check_valid_course
@check_valid_unit
@check_valid_question_type
def imp_question(course_id, unit_id, qtype, impq):
    """Set an IMP flag to question

    Returns:
        Same page with flag or without flag -- set an IMP flag to particular question.And do changes in database also.
    """
    obj = json.loads(impq)
    if qtype == "mcq":
        update_imp(MCQQuestion, obj)
        return redirect(
            url_for("questions.question",
                    qtype=qtype,
                    course_id=course_id,
                    unit_id=unit_id))
    else:
        update_imp(Question, obj)
        return redirect(
            url_for("questions.question",
                    qtype=qtype,
                    course_id=course_id,
                    unit_id=unit_id))


@questions.route(
    "/course/<course_id>/unit/<unit_id>/question/<qtype>/delete/<deleteq>/",
    methods=["GET"],
)
@login_required
@check_valid_course
@check_valid_unit
@check_valid_question_type
def delete_question(course_id, unit_id, qtype, deleteq):
    """Delete question

    Returns:
        page -- If current user is not an instructor of that subject then throw erroe else
        delete question's data. and update UI.
    """
    if qtype == "mcq":
        del_ids = json.loads(deleteq)
        db.session.query(MCQQuestion).filter(
            MCQQuestion.id.in_(del_ids)).delete(synchronize_session="fetch")
        db.session.commit()
        return redirect(
            url_for("questions.question",
                    qtype="mcq",
                    course_id=course_id,
                    unit_id=unit_id))
    else:
        del_ids = json.loads(deleteq)
        db.session.query(Question).filter(
            Question.id.in_(del_ids)).delete(synchronize_session="fetch")
        db.session.commit()
        return redirect(
            url_for("questions.question",
                    qtype="sub",
                    course_id=course_id,
                    unit_id=unit_id))
