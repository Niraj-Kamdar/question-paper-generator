from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField, StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange


class CourseForm(FlaskForm):
    course = StringField("Course", validators=[DataRequired()])
    submit = SubmitField("submit")


class QuestionForm(FlaskForm):
    question = TextAreaField("Question", validators=[DataRequired(), Length(min=2)])
    mark = IntegerField(
        "Mark",
        validators=[DataRequired(), NumberRange(1, 101, "Not in a valid mark range")],
    )
    difficulty = IntegerField(
        "Difficulty",
        validators=[
            DataRequired(),
            NumberRange(1, 101, "Not in a valid difficulty range"),
        ],
    )
    imp = BooleanField("Mark As IMP")
    submit = SubmitField("submit")


class MCQQuestionForm(QuestionForm):
    option1 = StringField("Option1", validators=[DataRequired()])
    option2 = StringField("Option2", validators=[DataRequired()])
    option3 = StringField("Option3", validators=[DataRequired()])
    option4 = StringField("Option4", validators=[DataRequired()])
