from flask import render_template, url_for, flash, redirect, json

from flaskapp import app, db
from flaskapp.forms import QuestionForm
from flaskapp.models import Question
# generate random integer values
from random import randint


@app.route("/")
def index():
    colors = [["#007991", "#00bfe6"], ["#642B73", "#C6426E"], ["#444444", "#777777"]]
    opacity = "b3"
    random_num = randint(0, len(colors) - 1)
    return render_template("index.html", color=colors[random_num], opacity=opacity)


@app.route("/question")
def questions():
    _questions = Question.query.all()
    # change css_file and js_file here!
    return render_template("questions.html",
                           questions=_questions,
                           css_file='css/question_form.css',
                           js_file='js/update_question.js'
                           )


def check_for_mcq(form):            
    count = 0
    if form.option1.data!="":
        count+=1
    if form.option2.data!="":
        count+=1
    if form.option3.data!="":
        count+=1
    if form.option4.data!="":
        count+=1
    if count==1:
        return -1
    if count>1:
        return 1
    return 0


@app.route("/question/new", methods=["GET", "POST"])
def add_question():
    form = QuestionForm()
    if form.validate_on_submit():
        question = Question(question=form.question.data,
                            mark=form.mark.data,
                            difficulty=form.difficulty.data,
                            imp=form.imp.data,
                            option1 = form.option1.data,
                            option2 = form.option2.data,
                            option3 = form.option3.data,
                            option4 = form.option4.data)
        rvalue = check_for_mcq(form)
        if(rvalue!=-1):
            question.is_mcq=bool(rvalue)        
            db.session.add(question)    
            db.session.commit()
            flash(f"New question added successfully!", "success")
            return redirect(url_for("questions"))        
        flash(f'Fill None or Two or More options','error')
    return render_template("question_form.html",
                           form=form,
                           css_file='css/question_form.css',
                           js_file='js/question_form.js',
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
        question.option1 = form.option1.data
        question.option2 = form.option2.data
        question.option3 = form.option3.data
        question.option4 = form.option4.data
        rvalue = check_for_mcq(form)
        if(rvalue!=-1):
            question.is_mcq = bool(rvalue)
            db.session.commit()
            flash(f"Question:{question_id} updated successfully!", "success")
            return redirect(url_for("questions"))
        flash(f'Fill None or Two or more options','error')        
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
