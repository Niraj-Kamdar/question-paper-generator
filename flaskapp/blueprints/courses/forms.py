from flask_login import current_user
from flask_wtf import FlaskForm
from sqlalchemy import and_
from wtforms import BooleanField, IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError, NumberRange

from flaskapp.models import Course, Unit


def validate_course_name(form, course_name):
    course = Course.query.filter(and_(Course.name == course_name.data, Course.teacher == current_user)).first()
    if course:
        raise ValidationError(
                "That Course is already exist. Please choose a different one.")


def validate_unit_name(form, unit_name):
    unit = Unit.query.filter(and_(Unit.name == unit_name.data, Unit.course == form.course)).first()
    if unit:
        raise ValidationError(
                "That Unit is already exist. Please choose a different one.")


def validate_chapter_no(form, chapter_no):
    unit = Unit.query.filter(and_(Unit.chapter_no == chapter_no.data, Unit.course == form.course)).first()
    if unit:
        raise ValidationError(
                "That Unit is already exist. Please choose a different one.")


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
                validate_chapter_no
            ],
    )
    name = StringField("Name", validators=[DataRequired(), validate_unit_name])
    submit = SubmitField("submit")

    def __init__(self, course):
        self.course = course
        super().__init__()
