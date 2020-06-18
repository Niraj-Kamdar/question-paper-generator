import functools

from flask import abort, redirect, url_for
from flask_login import current_user
from itsdangerous import BadSignature

from flaskapp.models import Course, Unit
from flaskapp.utils import json_url


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


def check_valid_data(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if not kwargs["data"]:
            return redirect(
                url_for("papers.paper_generate_request",
                        course_id=kwargs["course_id"])
            )
        try:
            kwargs["data"] = json_url.loads(kwargs["data"])
        except BadSignature:
            abort(406)
        return func(*args, **kwargs)

    return wrapper
