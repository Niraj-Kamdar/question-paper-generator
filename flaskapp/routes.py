from flask import render_template, url_for, flash, redirect
from flaskapp import app, db
from flaskapp.forms import QuestionForm
from flaskapp.models import Question
# generate random integer values
from random import seed
from random import randint
seed(1)


@app.route("/")
def index():
    colors = [["#007991","#00bfe6"],["#642B73","#C6426E"],["#444444","#777777"]]
    opacity = "b3"
    random_num = randint(0, len(colors)-1)
    return render_template("index.html",color=colors[random_num],opacity=opacity)


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
        return redirect(url_for("questions"))
    return render_template("question_form.html", form=form)


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
        db.session.commit()
        flash(f"Question:{question_id} updated successfully!", "success")
        return redirect(url_for("questions"))
    return render_template('question_form.html', form=form)
