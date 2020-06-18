from flask import url_for, redirect

from flaskapp import db
from flaskapp.models import Question
from flaskapp.utils import DifficultyEnum, CognitiveEnum, QuestionTypeEnum


def update_imp_in_db(obj):
    db.session.query(Question).filter(Question.id.in_(obj.get(
        "imp", []))).update(dict(imp=True), synchronize_session="fetch")
    db.session.query(Question).filter(Question.id.in_(obj.get(
        "notimp", []))).update(dict(imp=False), synchronize_session="fetch")
    db.session.commit()


def delete_question_from_db(obj):
    db.session.query(Question).filter(Question.id.in_(obj)).delete(
        synchronize_session="fetch"
    )
    db.session.commit()


def add_question_to_db(form, question, unit_id, qtype):
    _question = Question(
        question=question,
        mark=form.mark.data,
        difficulty=DifficultyEnum.from_string(form.difficulty.data),
        cognitive_level=CognitiveEnum.from_string(form.cognitive_level.data),
        question_type=QuestionTypeEnum.from_string(qtype),
        imp=form.imp.data,
        unit_id=unit_id,
    )
    db.session.add(_question)
    db.session.commit()


def update_question_in_db(form, question, qtype):
    question.mark = form.mark.data
    question.difficulty = DifficultyEnum.from_string(form.difficulty.data)
    question.cognitive_level = CognitiveEnum.from_string(
        form.cognitive_level.data)
    question.question_type = QuestionTypeEnum.from_string(qtype)
    question.imp = form.imp.data
    db.session.commit()


def redirect_to_all_questions(course_id, unit_id, qtype):
    return redirect(
        url_for(
            "questions.all_questions",
            qtype=qtype,
            course_id=course_id,
            unit_id=unit_id,
        ))
