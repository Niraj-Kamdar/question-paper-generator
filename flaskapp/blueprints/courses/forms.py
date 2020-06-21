from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms import IntegerField
from wtforms import StringField
from wtforms import SubmitField
from wtforms.validators import DataRequired
from wtforms.validators import NumberRange


class CourseForm(FlaskForm):
    course = StringField("Course", validators=[DataRequired()])
    # logo = StringField("Course logo")
    # include_asked = BooleanField("Should paper include asked questions?")
    submit = SubmitField("submit")


class UnitForm(FlaskForm):
    chapter_no = IntegerField(
        "Chapter No.",
        validators=[
            DataRequired(),
            NumberRange(1, 101, "Units can't be more than 100"),
        ],
    )
    name = StringField("Name", validators=[DataRequired()])
    submit = SubmitField("submit")
