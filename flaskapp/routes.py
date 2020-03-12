from flask import render_template, url_for, flash, redirect,request
from flaskapp import app, db
from flaskapp.forms import QuestionForm,updateForm
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

@app.route("/show_questions") #List all the questions in database and when clicked on question it goes to update question
def show_question():
    q = db.session.query(Question).all() 
    return render_template('list_question.html',questions = q) 

@app.route("/update_question",methods=["GET","POST"]) 
def update_question():
    question_id = request.args.get('question_id')
    que = db.session.query(Question).filter_by(id = question_id).first()
    if que == None:
        flash(f"Question Does not exist", "Failure")
        return redirect(url_for("show_question"))
    form = updateForm()
    if form.validate_on_submit():        
        if form.mark.data is not None:
            que.mark = form.mark.data
        if form.difficulty.data is not None:
            que.difficulty = form.difficulty.data
        db.session.commit()
        flash(f"Update successfull!", "success")
        return redirect(url_for("show_question"))
    return render_template('updateMarkDifficulty.html',form = form,que = que)

