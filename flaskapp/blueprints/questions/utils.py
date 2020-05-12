import functools

from flask import abort
from flask_login import current_user

from flaskapp import db
from flaskapp.models import Course
from flaskapp.models import Unit


def check_valid_course(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        _course = Course.query.filter(Course.id == kwargs["course_id"]).first()
        if _course is None or _course.teacher != current_user:
            abort(403)
        return func(*args, **kwargs)

    return wrapper


def check_valid_unit(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        _course = Course.query.filter(Course.id == kwargs["course_id"]).first()
        _unit = Unit.query.filter(Unit.id == kwargs["unit_id"]).first()
        if _unit is None or _unit.course != _course:
            abort(403)
        return func(*args, **kwargs)

    return wrapper


def check_valid_question_type(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if kwargs["qtype"] not in ["sub", "mcq"]:
            abort(404)
        return func(*args, **kwargs)

    return wrapper


def update_imp(question, obj):
    db.session.query(question).filter(question.id.in_(obj["imp"])).update(
        dict(imp=True), synchronize_session="fetch")
    db.session.query(question).filter(question.id.in_(obj["notimp"])).update(
        dict(imp=False), synchronize_session="fetch")
    db.session.commit()
