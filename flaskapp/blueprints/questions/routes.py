from flask import render_template, flash, redirect, url_for, json, Blueprint, abort, request
from flask_login import login_required, current_user

from flaskapp import db
from flaskapp.blueprints.questions.forms import CourseForm, MCQQuestionForm, QuestionForm
from flaskapp.models import MCQQuestion, Question, Course

questions = Blueprint('questions', __name__)


@questions.route("/course/<course_id>/question/<qtype>/")
@login_required
def question(course_id, qtype):
    """Rendering Question page

    Arguments:
        course_id {Object} -- Id for course
        qtype {Subjective/mcq} -- Specification about question is subjective or MCQ type

    Returns:
        HTML Function -- According to choosen type of question render page
    """
    _course = Course.query.filter(Course.id == course_id).first()
    if _course is None or _course.teacher != current_user:
        abort(403)
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    _courses = Course.query.filter(Course.teacher == current_user).all()
    main_page = request.args.get('page', 1, type=int)
    if qtype == "mcq":
        _mcq_questions = MCQQuestion.query.filter(MCQQuestion.course_id == course_id).paginate(page=main_page,
                                                                                               per_page=1)
        return render_template("questions/mcq_questions.html",
                               questions=_mcq_questions,
                               courses=_courses,
                               course_id=course_id,
                               qtype=qtype,
                               css_file='css/base.css',
                               css_file2='css/questions/mcq_form.css',
                               css_file3='css/questions/sideNav.css',
                               js_file='js/questions/update_mcq_question.js',
                               js_file2='js/sideNav.js',
                               image_file=image_file,
                               title='Objective Questions'
                               )
    elif qtype == "sub":
        _questions = Question.query.filter(Question.course_id == course_id).paginate(page=main_page, per_page=1)
        return render_template("questions/questions.html",
                               questions=_questions,
                               courses=_courses,
                               course_id=course_id,
                               qtype=qtype,
                               css_file='css/base.css',
                               css_file2='css/questions/question_form.css',
                               css_file3='css/questions/sideNav.css',
                               js_file='js/questions/update_question.js',
                               js_file2='js/sideNav.js',
                               image_file=image_file,
                               title='Subjective Questions'
                               )
    abort(404)


@questions.route('/course/new/', methods=["GET", "POST"])
@login_required
def add_course():
    """Rendering to add course page

    Returns:
        HTML function -- For adding new course to user's account. After submitting new course redirect to courses page.Else show form which
        shows add course feild.
    """
    form = CourseForm()
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    if form.validate_on_submit():
        course = Course(name=form.course.data, teacher=current_user)
        db.session.add(course)
        db.session.commit()
        flash("New course added successfully!", "success")
        return redirect(url_for("questions.courses"))
    return render_template("questions/course_form.html",
                           form=form,
                           css_file='css/base.css',
                           css_file2='css/questions/courses_form.css',
                           js_file='js/questions/add_course.js',
                           image_file=image_file,
                           title='Add Courses'
                           )


@questions.route('/course/')
@login_required
def courses():
    """Show listed down course of user

    Returns:
        HTML function -- Redirect to courses pages where listed down all courses.
    """
    _courses = Course.query.filter(Course.teacher == current_user).all()
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template("questions/courses.html",
                           courses=_courses,
                           css_file='css/base.css',
                           css_file2='css/questions/courses.css',
                           js_file='js/questions/courses.js',
                           image_file=image_file,
                           title='Courses')


@questions.route("/course/<course_id>/question/<qtype>/new/", methods=["GET", "POST"])
@login_required
def add_question(course_id, qtype):
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
    _course = Course.query.filter(Course.id == course_id).first()
    if _course is None or _course.teacher != current_user:
        abort(403)
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    _courses = Course.query.filter(Course.teacher == current_user).all()
    if qtype == "mcq":
        form = MCQQuestionForm()
        if form.validate_on_submit():
            _question = MCQQuestion(question=form.question.data,
                                    mark=form.mark.data,
                                    difficulty=form.difficulty.data,
                                    imp=form.imp.data,
                                    option1=form.option1.data,
                                    option2=form.option2.data,
                                    option3=form.option3.data,
                                    option4=form.option4.data,
                                    course_id=course_id)
            db.session.add(_question)
            db.session.commit()
            flash("New question added successfully!", "success")
            return redirect(url_for("questions.question", qtype="mcq", course_id=course_id))
        return render_template("questions/mcq_question_form.html",
                               form=form,
                               courses=_courses,
                               css_file='css/base.css',
                               css_file2='css/questions/mcq_form.css',
                               css_file3='css/questions/sideNav.css',
                               js_file='js/questions/mcq_question_form.js',
                               js_file2='js/sideNav.js',
                               image_file=image_file,
                               title='Add Objective Question'
                               )
    elif qtype == "sub":
        form = QuestionForm()
        if form.validate_on_submit():
            _question = Question(question=form.question.data,
                                 mark=form.mark.data,
                                 difficulty=form.difficulty.data,
                                 imp=form.imp.data,
                                 course_id=course_id)
            db.session.add(_question)
            db.session.commit()
            flash("New question added successfully!", "success")
            return redirect(url_for("questions.question", qtype="sub", course_id=course_id))
        return render_template("questions/question_form.html",
                               form=form,
                               courses=_courses,
                               css_file='css/base.css',
                               css_file2='css/questions/question_form.css',
                               css_file3='css/questions/sideNav.css',
                               js_file='js/questions/question_form.js',
                               js_file2='js/sideNav.js',
                               image_file=image_file,
                               title='Add Subjective Question'
                               )
    abort(404)


@questions.route("/course/<course_id>/question/<qtype>/update/<int:question_id>/", methods=["GET", "POST"])
@login_required
def update_question(course_id, qtype, question_id):
    """For updating question

    Returns:
        Render template -- for updating questions if that question is exist then update it by id.And update marks , difficulty and IMP flag accorging to input.
       And do changes in database accordingly.
    """
    _course = Course.query.filter(Course.id == course_id).first()
    if _course is None or _course.teacher != current_user:
        abort(403)
    if qtype == "mcq":
        _question = db.session.query(MCQQuestion).filter_by(id=question_id).first()
        if _question is None:
            flash(f"Question:{question_id} Does not exist", "Failure")
            return redirect(url_for("questions.question", qtype=qtype, course_id=course_id))
        form = MCQQuestionForm(**_question.to_dict())
        if form.validate_on_submit():
            _question.question = form.question.data
            _question.mark = form.mark.data
            _question.difficulty = form.difficulty.data
            _question.imp = form.imp.data
            _question.option1 = form.option1.data
            _question.option2 = form.option2.data
            _question.option3 = form.option3.data
            _question.option4 = form.option4.data
            db.session.commit()
            flash(f"Question:{question_id} updated successfully!", "success")
            return redirect(url_for("questions.question", qtype=qtype, course_id=course_id))
        return render_template('questions/mcq_question_form.html',
                               form=form,
                               css_file='css/questions/question_form.css',
                               js_file='js/questions/question_form.js'
                               )
    elif qtype == "sub":
        _question = db.session.query(Question).filter_by(id=question_id).first()
        if _question is None:
            flash(f"Question:{question_id} Does not exist", "Failure")
            return redirect(url_for("questions.question", qtype="sub", course_id=course_id))
        form = QuestionForm(**_question.to_dict())
        if form.validate_on_submit():
            _question.question = form.question.data
            _question.mark = form.mark.data
            _question.difficulty = form.difficulty.data
            _question.imp = form.imp.data
            db.session.commit()
            flash(f"Question:{question_id} updated successfully!", "success")
            return redirect(url_for("questions.question", qtype="sub", course_id=course_id))
        return render_template('questions/question_form.html',
                               form=form,
                               css_file='css/questions/question_form.css',
                               js_file='js/questions/question_form.js'
                               )
    abort(404)


@questions.route("/course/<course_id>/question/<qtype>/imp/<impq>/", methods=["GET"])
@login_required
def imp_question(course_id, qtype, impq):
    """Set an IMP flag to question

    Returns:
        Same page with flag or without flag -- set an IMP flag to particular question.And do changes in database also.
    """
    _course = Course.query.filter(Course.id == course_id).first()
    if _course is None or _course.teacher != current_user:
        abort(403)
    obj = json.loads(impq)
    imp = obj["imp"]
    notimp = obj["notimp"]
    if qtype == "mcq":
        db.session.query(MCQQuestion).filter(MCQQuestion.id.in_(imp)).update(dict(imp=True),
                                                                             synchronize_session='fetch')
        db.session.query(MCQQuestion).filter(MCQQuestion.id.in_(notimp)).update(dict(imp=False),
                                                                                synchronize_session='fetch')
        db.session.commit()
        return redirect(url_for("questions.question", qtype=qtype, course_id=course_id))
    elif qtype == "sub":
        db.session.query(Question).filter(Question.id.in_(imp)).update(dict(imp=True), synchronize_session='fetch')
        db.session.query(Question).filter(Question.id.in_(notimp)).update(dict(imp=False), synchronize_session='fetch')
        db.session.commit()
        return redirect(url_for("questions.question", qtype=qtype, course_id=course_id))
    abort(404)


@questions.route("/course/<course_id>/question/<qtype>/delete/<deleteq>/", methods=["GET"])
@login_required
def delete_question(course_id, qtype, deleteq):
    """Delete question

    Returns:
        page -- If current user is not an instructor of that subject then throw erroe else
        delete question's data. and update UI.
    """
    _course = Course.query.filter(Course.id == course_id).first()
    if _course is None or _course.teacher != current_user:
        abort(403)
    if qtype == "mcq":
        del_ids = json.loads(deleteq)
        db.session.query(MCQQuestion).filter(MCQQuestion.id.in_(del_ids)).delete(synchronize_session='fetch')
        db.session.commit()
        return redirect(url_for("questions.question", qtype="mcq", course_id=course_id))
    elif qtype == "sub":
        del_ids = json.loads(deleteq)
        db.session.query(Question).filter(Question.id.in_(del_ids)).delete(synchronize_session='fetch')
        db.session.commit()
        return redirect(url_for("questions.question", qtype="sub", course_id=course_id))
    abort(404)
