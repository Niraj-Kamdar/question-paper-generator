from flask_login import current_user
from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from wtforms import BooleanField
from wtforms import FileField
from wtforms import PasswordField
from wtforms import StringField
from wtforms import SubmitField
from wtforms.validators import DataRequired
from wtforms.validators import Email
from wtforms.validators import EqualTo
from wtforms.validators import Length
from wtforms.validators import ValidationError

from flaskapp.models import User


def validate_email_exists(form, email):
    """Validation on existance of e-mail ID

    Args:
        form (Object): Description of user's detail
        email (String): email which user entered

    Raises:
        ValidationError: If there's no account with that email then retrun error of There is no account with that email. You must register first.
    """
    user = User.query.filter_by(email=email.data).first()
    if user is None:
        raise ValidationError(
            "There is no account with that email. You must register first.")


def validate_username(form, username):
    """Validation on username

    Args:
        form (Object): Description of user
        username (string): username  of user

    Raises:
        ValidationError: If username is taken throw error of That username is taken. Please choose a different one.
    """
    user = User.query.filter_by(username=username.data).first()
    if user:
        if current_user:
            if user == current_user:
                return
        raise ValidationError(
            "That username is taken. Please choose a different one.")


def validate_email(form, email):
    """Validation on email

    Args:
        form (Object): Description of user
        email (string): Email ID of user

    Raises:
        ValidationError: If email is taken throw error of That email is taken. Please choose a different one.
    """
    user = User.query.filter_by(email=email.data).first()
    if user:
        if current_user:
            if user == current_user:
                return
        raise ValidationError(
            "That email is taken. Please choose a different one.")


class RegistrationForm(FlaskForm):
    username = StringField(
        "Username",
        validators=[DataRequired(),
                    Length(min=2, max=20), validate_username],
    )
    email = StringField("Email",
                        validators=[DataRequired(),
                                    Email(), validate_email])
    password = PasswordField("Password", validators=[DataRequired()])
    confirm_password = PasswordField(
        "Confirm Password", validators=[DataRequired(),
                                        EqualTo("password")])
    submit = SubmitField("Sign Up")


class UpdateAccountForm(FlaskForm):
    username = StringField(
        "Username",
        validators=[DataRequired(),
                    Length(min=2, max=20), validate_username],
    )
    email = StringField("Email",
                        validators=[DataRequired(),
                                    Email(), validate_email])
    picture = FileField("Update Profile Picture",
                        validators=[FileAllowed(["jpg", "png"])])
    submit = SubmitField("Update")


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember = BooleanField("Remember Me")
    submit = SubmitField("Login")


class RequestResetForm(FlaskForm):
    email = StringField(
        "Email", validators=[DataRequired(),
                             Email(), validate_email_exists])
    submit = SubmitField("Request Password Reset")


class ResetPasswordForm(FlaskForm):
    password = PasswordField("Password", validators=[DataRequired()])
    confirm_password = PasswordField(
        "Confirm Password", validators=[DataRequired(),
                                        EqualTo("password")])
    submit = SubmitField("Reset Password")
