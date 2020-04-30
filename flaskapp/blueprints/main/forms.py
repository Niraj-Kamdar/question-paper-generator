from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, Email


class ContactUs(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField("Email", validators=[DataRequired(), Email()])
    mobile = StringField("Mobile", validators=[Length(4, 16)])
    subject = StringField("Subject", validators=[DataRequired(), Length(5, 200)])
    message = TextAreaField("Message", validators=[DataRequired(), Length(5, 10000)])
