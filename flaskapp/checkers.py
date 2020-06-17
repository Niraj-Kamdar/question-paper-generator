import functools

from flask import abort
from flask_login import current_user

from flaskapp.models import Course
from flaskapp.models import Unit


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
