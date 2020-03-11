from flask import render_template, url_for, flash, redirect
from flaskapp import app, db
from flaskapp.forms import QuestionForm
from flaskapp.models import Question


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/question")
def questions():
    _questions = Question.query.all()
    return render_template("questions.html", questions=_questions)

@app.route("/question/new", methods=["GET", "POST"])
def add_question():
    form = QuestionForm()
    if form.validate_on_submit():
        question = Question(question=form.question.data,
                            mark=form.mark.data,
                            difficulty=form.difficulty.data)
        db.session.add(question)
        db.session.commit()
        flash(f"New question added successfully!", "success")
        return redirect(url_for("add_question"))
    return render_template("question_form.html", form=form)
