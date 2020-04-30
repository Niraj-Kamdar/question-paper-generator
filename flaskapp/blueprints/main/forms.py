from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import TextAreaField
from wtforms.validators import DataRequired
from wtforms.validators import Email
from wtforms.validators import Length


class ContactUs(FlaskForm):
    name = StringField("Name",
                       validators=[DataRequired(),
                                   Length(min=2, max=20)])
    email = StringField("Email", validators=[DataRequired(), Email()])
    mobile = StringField("Mobile", validators=[Length(4, 16)])
    subject = StringField("Subject",
                          validators=[DataRequired(),
                                      Length(5, 200)])
    message = TextAreaField("Message",
                            validators=[DataRequired(),
                                        Length(5, 10000)])
