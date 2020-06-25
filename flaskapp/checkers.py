import functools

from flask import abort
from flask import redirect
from flask import session
from flask import url_for
from flask_login import current_user
from itsdangerous import BadSignature

from flaskapp.models import Course, Paper
from flaskapp.models import Unit
from flaskapp.utils import json_url


def check_valid_course(func):
    """Validation of course

    Args:
        func (Object): description about course

    Returns:
        error: if not valid course thrw an error of 403
    """

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        _course = Course.query.filter(Course.id == kwargs["course_id"]).first()
        if _course is None or _course.teacher != current_user:
            abort(403)
        return func(*args, **kwargs)

    return wrapper


def check_valid_unit(func):
    """Validation to unit

    Args:
        func (Object): description of unit

    Returns:
        error : if not in course throw an error of 403
    """

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        _course = Course.query.filter(Course.id == kwargs["course_id"]).first()
        _unit = Unit.query.filter(Unit.id == kwargs["unit_id"]).first()
        if _unit is None or _unit.course != _course:
            abort(403)
        return func(*args, **kwargs)

    return wrapper


def check_valid_question_type(func):
    """Validation to question type

    Args:
        func (Object): Desceription of question type

    Returns:
        error: If not valid(subjective or mcq) then abort 404 error else return wrapper for question
    """

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if kwargs["qtype"] not in ["sub", "mcq"]:
            abort(404)
        return func(*args, **kwargs)

    return wrapper


def check_valid_paper(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        _courses = Course.query.filter_by(user_id=current_user.id).all()
        _course_ids = [course.id for course in _courses]
        _paper = Paper.query.filter(Paper.id == kwargs["paper_id"]).first()
        if _paper is None:
            abort(404)
        if _paper.course_id not in _course_ids:
            abort(403)
        return func(*args, **kwargs)
    return wrapper


def check_valid_session(func=None, *, session_keys=()):
    if func is None:
        return functools.partial(check_valid_session,
                                 session_keys=session_keys)

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        for session_key in session_keys:
            data = session.get(session_key, None)
            if not data:
                return redirect(
                    url_for("papers.paper_generate_request",
                            course_id=kwargs["course_id"]))
            try:
                json_url.loads(data)
            except BadSignature:
                abort(406)
        return func(*args, **kwargs)

    return wrapper
