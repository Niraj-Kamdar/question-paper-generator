from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, NumberRange

class QuestionForm(FlaskForm):
    question = TextAreaField('Question',
                             validators=[DataRequired(), Length(min=2)])
    mark = IntegerField('Mark',
                        validators=[DataRequired(), NumberRange(1, 100, "Not in a valid mark range")])
    difficulty = IntegerField('Difficulty',
                              validators=[DataRequired(), NumberRange(1, 100, "Not a valid difficulty")])
    imp = BooleanField('imp')
    submit = SubmitField('submit')