from flask import render_template, url_for, flash, redirect, json

from flaskapp import app, db
from flaskapp.forms import QuestionForm
from flaskapp.models import Question


@app.route("/", methods=['GET', 'POST'])
def index():
    # background_colors = ["#e6e6e6", "#ffe0cc"]
    # light_background_colors = ["#f2f2f2", "#fff0e6"]
    # text_colors = ["#808080", "#ff6600"]
    return render_template("index.html")


@app.route("/question")
def questions():
    _questions = Question.query.all()
    # change css_file and js_file here!
    return render_template("questions.html",
                           questions=_questions,
                           css_file='css/question_form.css',
                           js_file='js/update_question.js'
                           )


@app.route("/question/new", methods=["GET", "POST"])
def add_question():
    form = QuestionForm()
    if form.validate_on_submit():
        question = Question(question=form.question.data,
                            mark=form.mark.data,
                            difficulty=form.difficulty.data,
                            imp=form.imp.data)
        db.session.add(question)
        db.session.commit()
        flash(f"New question added successfully!", "success")
        return redirect(url_for("questions"))
    return render_template("question_form.html",
                           form=form,
                           css_file='css/question_form.css',
                           js_file='js/question_form.js'
                           )


@app.route("/question/update/<int:question_id>", methods=["GET", "POST"])
def update_question(question_id):
    question = db.session.query(Question).filter_by(id=question_id).first()
    if question is None:
        flash(f"Question:{question_id} Does not exist", "Failure")
        return redirect(url_for("questions"))
    form = QuestionForm(**question.to_dict())
    if form.validate_on_submit():
        question.question = form.question.data
        question.mark = form.mark.data
        question.difficulty = form.difficulty.data
        question.imp = form.imp.data
        db.session.commit()
        flash(f"Question:{question_id} updated successfully!", "success")
        return redirect(url_for("questions"))
    return render_template('question_form.html',
                           form=form,
                           css_file='css/question_form.css',
                           js_file='js/question_form.js'
                           )


@app.route("/question/imp/<impq>", methods=["GET"])
def imp_question(impq):
    """impq string convert to list of imp and notimp"""
    obj = json.loads(impq)
    imp = obj["imp"]
    notimp = obj["notimp"]
    db.session.query(Question).filter(Question.id.in_(imp)).update(dict(imp=True), synchronize_session='fetch')
    db.session.query(Question).filter(Question.id.in_(notimp)).update(dict(imp=False), synchronize_session='fetch')
    db.session.commit()
    return redirect(url_for("questions"))


@app.route("/question/delete/<deleteq>", methods=["GET"])
def delete_question(deleteq):
    """impq string convert to list of imp and notimp"""
    del_ids = json.loads(deleteq)
    db.session.query(Question).filter(Question.id.in_(del_ids)).delete(synchronize_session='fetch')
    db.session.commit()
    return redirect(url_for("questions"))
