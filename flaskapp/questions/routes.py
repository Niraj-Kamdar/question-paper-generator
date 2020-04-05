from flask import render_template, flash, redirect, url_for, json, Blueprint
from flask_login import login_required, current_user

from flaskapp import db
from flaskapp.models import MCQQuestion, Question, Course
from flaskapp.questions.forms import CourseForm, MCQQuestionForm, QuestionForm

questions = Blueprint('questions', __name__)


@questions.route("/course/<course_id>/question/<qtype>/")
@login_required
def question(course_id, qtype):
    _courses = Course.query.filter(Course.teacher == current_user).all()
    if qtype == "mcq":
        _mcq_questions = MCQQuestion.query.filter(MCQQuestion.course_id == course_id).all()
        # change css_file and js_file here!
        return render_template("questions/mcq_questions.html",
                               questions=_mcq_questions,
                               courses=_courses,
                               css_file='css/mcq_form.css',
                               js_file='js/update_mcq_question.js',
                               title='Objective Questions'
                               )
    elif qtype == "sub":
        _questions = Question.query.filter(Question.course_id == course_id).all()
        # change css_file and js_file here!
        return render_template("questions/questions.html",
                               questions=_questions,
                               courses=_courses,
                               css_file='css/question_form.css',
                               js_file='js/update_question.js',
                               title='Subjective Questions'
                               )


@questions.route('/course/new/', methods=["GET", "POST"])
@login_required
def add_course():
    form = CourseForm()
    if form.validate_on_submit():
        course = Course(name=form.course.data, teacher=current_user)
        db.session.add(course)
        db.session.commit()
        flash(f"New course added successfully!", "success")
        return redirect(url_for("questions.courses"))
    return render_template("questions/course_form.html",
                           form=form,
                           css_file='css/question_form.css',
                           js_file='js/question_form.js',
                           title='Add Courses'
                           )


@questions.route('/course/')
@login_required
def courses():
    _courses = Course.query.filter(Course.teacher == current_user).all()
    return render_template("questions/courses.html",
                           courses=_courses,
                           title='Courses')


@questions.route("/course/<course_id>/question/<qtype>/new/", methods=["GET", "POST"])
@login_required
def add_question(course_id, qtype):
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
            flash(f"New question added successfully!", "success")
            return redirect(url_for("questions.question", qtype="mcq", course_id=course_id))
        return render_template("questions/mcq_question_form.html",
                               form=form,
                               courses = _courses,
                               css_file='css/mcq_form.css',
                               js_file='js/mcq_question_form.js',
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
            flash(f"New question added successfully!", "success")
            return redirect(url_for("questions.question", qtype="sub", course_id=course_id))
        return render_template("questions/question_form.html",
                               form=form,
                               courses = _courses,
                               css_file='css/question_form.css',
                               js_file='js/question_form.js',
                               title='Add Subjective Question'
                               )


@questions.route("/course/<course_id>/question/<qtype>/update/<int:question_id>/", methods=["GET", "POST"])
@login_required
def update_question(course_id, qtype, question_id):
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
                               css_file='css/question_form.css',
                               js_file='js/question_form.js'
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
                               css_file='css/question_form.css',
                               js_file='js/question_form.js'
                               )


@questions.route("/course/<course_id>/question/<qtype>/imp/<impq>/", methods=["GET"])
@login_required
def imp_question(course_id, qtype, impq):
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


@questions.route("/course/<course_id>/question/<qtype>/delete/<deleteq>/", methods=["GET"])
@login_required
def delete_question(course_id, qtype, deleteq):
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
