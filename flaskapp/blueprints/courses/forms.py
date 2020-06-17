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
    """Validate Course name

    Args:
        form (Object): Description about course 
        course_name (String): Name of course

    Raises:
        ValidationError: If coursename is already exist then give error of already course exist. Please choose different one.
    """
    course = Course.query.filter(
        and_(Course.name == course_name.data,
             Course.teacher == current_user)).first()
    if course:
        raise ValidationError(
            "That Course is already exist. Please choose a different one.")


def validate_unit_name(form, unit_name):
    """Validation of unit name

    Args:
        form (Object): [description of unit] 
        unit_name (string): Name of unit        

    Raises:
        ValidationError: If unit is already exist then give error for that.
    """
    unit = Unit.query.filter(
        and_(Unit.name == unit_name.data, Unit.course == form.course)).first()
    if unit:
        raise ValidationError(
            "That Unit is already exist. Please choose a different one.")


def validate_chapter_no(form, chapter_no):
    """Validation to chapter

    Args:
        form (object): form of description of chapter
        chapter_no (int): Chapter number from course

    Raises:
        ValidationError: This unit is alresady exist. Please choose different 
    """
    unit = Unit.query.filter(
        and_(Unit.chapter_no == chapter_no.data,
             Unit.course == form.course)).first()
    if unit:
        raise ValidationError(
            "That Unit is already exist. Please choose a different one.")


class CourseForm(FlaskForm):
    course = StringField("Course",
                         validators=[DataRequired(), validate_course_name])
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
