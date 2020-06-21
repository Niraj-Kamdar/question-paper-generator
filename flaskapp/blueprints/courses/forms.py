from flask_login import current_user
from flask_wtf import FlaskForm
from sqlalchemy import and_
from wtforms import BooleanField
from wtforms import IntegerField
from wtforms import StringField
from wtforms import SubmitField
from wtforms.validators import DataRequired
from wtforms.validators import NumberRange
from wtforms.validators import ValidationError

from flaskapp.models import Course
from flaskapp.models import Unit


def validate_course_name(form, course_name):
    """Validation of course name

    Args:
        form (FlaskForm): In which given description about course
        course_name (StringField): Name of course

    Raises:
        ValidationError: If already exist then error of That Course is already exist. Please choose a different one. else add the course
    """
    course = Course.query.filter(
        and_(Course.name == course_name.data, Course.teacher == current_user)
    ).first()
    if course:
        raise ValidationError(
            "That Course is already exist. Please choose a different one."
        )


def validate_unit_name(form, unit_name):
    """Validation on unit name of the course

    Args:
        form (FlaskForm): Form i which all the details of unit
        unit_name (StringField): Name of unit that user want to add

    Raises:
        ValidationError: If already there then give error of That Unit is already exist. Please choose a different one. else add name of unit
    """
    unit = Unit.query.filter(
        and_(Unit.name == unit_name.data, Unit.course == form.course)
    ).first()
    if unit:
        raise ValidationError(
            "That Unit is already exist. Please choose a different one."
        )


def validate_chapter_no(form, chapter_no):
    unit = Unit.query.filter(
        and_(Unit.chapter_no == chapter_no.data, Unit.course == form.course)
    ).first()
    if unit:
        raise ValidationError(
            "That Unit is already exist. Please choose a different one."
        )


class CourseForm(FlaskForm):
    course = StringField("Course", validators=[DataRequired(), validate_course_name])
    include_asked = BooleanField("Should paper include asked questions?")
    submit = SubmitField("submit")


class UnitForm(FlaskForm):
    chapter_no = IntegerField(
        "Chapter No.",
        validators=[
            DataRequired(),
            NumberRange(1, 101, "Units can't be more than 100"),
            validate_chapter_no,
        ],
    )
    name = StringField("Name", validators=[DataRequired(), validate_unit_name])
    submit = SubmitField("submit")

    def __init__(self, course):
        self.course = course
        super().__init__()
