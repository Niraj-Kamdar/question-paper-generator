import functools

from flask import abort
from flask_login import current_user

from flaskapp.models import Course
from flaskapp.models import Unit


def check_valid_course(func):
    """Validation of course

    Args:
        func (Object): As an object pass to check validation of course

    Returns:
        Function: If validate then return function otherwise give erroer of 403
    """

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        _course = Course.query.filter(Course.id == kwargs["course_id"]).first()
        if _course is None or _course.teacher != current_user:
            abort(403)
        return func(*args, **kwargs)

    return wrapper


def check_valid_unit(func):
    """Check validation on unit

    Args:
        func (object): As an object to check validation

    Returns:
        Function: If unit is valid otherwise give error ot 403
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
        func (object): To verify question type

    Returns:
        Function call: For valid question type i.e. subjective or mcq otherwise give error 404
    """

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if kwargs["qtype"] not in ["sub", "mcq"]:
            abort(404)
        return func(*args, **kwargs)

    return wrapper
