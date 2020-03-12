from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, Email, EqualTo, NumberRange,Optional


class QuestionForm(FlaskForm):
    question = TextAreaField('Question',
                             validators=[DataRequired(), Length(min=2)])
    mark = IntegerField('Mark',
                        validators=[DataRequired(), NumberRange(1, 100, "Not in a valid mark range")])
    difficulty = IntegerField('Difficulty',
                              validators=[DataRequired(), NumberRange(1, 100, "Not a valid difficulty")])
    submit = SubmitField('submit')
class updateForm(FlaskForm):
    mark = IntegerField('Mark',
                        validators=[NumberRange(1, 100, "Not in a valid mark range"),Optional()])
    difficulty = IntegerField('Difficulty',
                              validators=[NumberRange(1, 100, "Not a valid difficulty"),Optional()])
    submit = SubmitField('submit')