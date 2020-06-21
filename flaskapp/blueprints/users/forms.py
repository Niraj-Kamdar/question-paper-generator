from flask_login import current_user
from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from flaskapp.models import User
from wtforms import (BooleanField, FileField, PasswordField, StringField,
                     SubmitField)
from wtforms.validators import (DataRequired, Email, EqualTo, Length,
                                ValidationError)


def validate_email_exists(form, email):
    user = User.query.filter_by(email=email.data).first()
    if user is None:
        raise ValidationError(
            "There is no account with that email. You must register first."
        )


def validate_username(form, username):
    user = User.query.filter_by(username=username.data).first()
    if user:
        if current_user:
            if user == current_user:
                return
        raise ValidationError("That username is taken. Please choose a different one.")


def validate_email(form, email):
    user = User.query.filter_by(email=email.data).first()
    if user:
        if current_user:
            if user == current_user:
                return
        raise ValidationError("That email is taken. Please choose a different one.")


class RegistrationForm(FlaskForm):
    username = StringField(
        "Username",
        validators=[DataRequired(), Length(min=2, max=20), validate_username],
    )
    email = StringField("Email", validators=[DataRequired(), Email(), validate_email])
    password = PasswordField("Password", validators=[DataRequired()])
    confirm_password = PasswordField(
        "Confirm Password", validators=[DataRequired(), EqualTo("password")]
    )
    submit = SubmitField("Sign Up")


class UpdateAccountForm(FlaskForm):
    username = StringField(
        "Username",
        validators=[DataRequired(), Length(min=2, max=20), validate_username],
    )
    email = StringField("Email", validators=[DataRequired(), Email(), validate_email])
    picture = FileField(
        "Update Profile Picture", validators=[FileAllowed(["jpg", "png"])]
    )
    submit = SubmitField("Update")


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember = BooleanField("Remember Me")
    submit = SubmitField("Login")


class RequestResetForm(FlaskForm):
    email = StringField(
        "Email", validators=[DataRequired(), Email(), validate_email_exists]
    )
    submit = SubmitField("Request Password Reset")


class ResetPasswordForm(FlaskForm):
    password = PasswordField("Password", validators=[DataRequired()])
    confirm_password = PasswordField(
        "Confirm Password", validators=[DataRequired(), EqualTo("password")]
    )
    submit = SubmitField("Reset Password")
