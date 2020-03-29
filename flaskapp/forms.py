from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField, IntegerField, BooleanField, StringField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange


class QuestionForm(FlaskForm):
    question = TextAreaField('Question',
                             validators=[DataRequired(), Length(min=2)])
    mark = IntegerField('Mark',
                        validators=[DataRequired(), NumberRange(1, 101, "Not in a valid mark range")])
    difficulty = IntegerField('Difficulty',
                              validators=[DataRequired(), NumberRange(1, 101, "Not in a valid difficulty range")])
    imp = BooleanField('imp')
    submit = SubmitField('submit')


class MCQQuestionForm(QuestionForm):
    option1 = StringField('Option1',
                          validators=[DataRequired()])
    option2 = StringField('Option2',
                          validators=[DataRequired()])
    option3 = StringField('Option3',
                          validators=[DataRequired()])
    option4 = StringField('Option4',
                          validators=[DataRequired()])
