from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField, IntegerField
from wtforms.validators import DataRequired, NumberRange


class CourseForm(FlaskForm):
    course = StringField("Course", validators=[DataRequired()])
    logo = StringField("Course logo")
    include_asked = BooleanField("Should paper include asked questions?")
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
