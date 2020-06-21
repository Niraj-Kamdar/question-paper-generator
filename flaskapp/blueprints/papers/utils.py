import os
import secrets

from flask import current_app
from flaskapp import db
from flaskapp.models import Question, Unit
from PIL import Image
from sqlalchemy import and_, func


def find_conflicting_questions(course_id, constraints):
    unit = (
        db.session.query(Unit)
        .filter(
            and_(Unit.chapter_no == constraints["unit"], Unit.course_id == course_id)
        )
        .first()
    )
    return (
        db.session.query(Question)
        .filter(
            and_(
                Question.cognitive_level == constraints["cognitive"],
                Question.difficulty == constraints["difficulty"],
                Question.mark == constraints["mark"],
                Question.unit_id == unit.id,
                Question.question_type == constraints["question_type"],
                Question.imp is True,
                Question.is_asked is True,
            )
        )
        .all()
    )


def find_random_question(course_id, constraints):
    unit = (
        db.session.query(Unit)
        .filter(
            and_(Unit.chapter_no == constraints["unit"], Unit.course_id == course_id)
        )
        .first()
    )
    return (
        db.session.query(Question)
        .filter(
            and_(
                Question.cognitive_level == constraints["cognitive"],
                Question.difficulty == constraints["difficulty"],
                Question.mark == constraints["mark"],
                Question.unit_id == unit.id,
            )
        )
        .order_by(func.random())
        .first()
        .id
    )


def save_logo(form_picture):
    """Save profile picture

    Arguments:
        form_picture {form} -- Entered picture which user want to set to his profile

    Returns:
        string -- To save picture
    """
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = secrets.token_urlsafe(10) + f_ext
    picture_path = os.path.join(current_app.root_path, "static/logos", picture_fn)

    output_size = (400, 400)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn
