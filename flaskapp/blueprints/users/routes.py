from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user

from flaskapp import bcrypt, db
from flaskapp.blueprints.users.forms import LoginForm, RegistrationForm, RequestResetForm, ResetPasswordForm, \
    UpdateAccountForm
from flaskapp.blueprints.users.utils import save_picture, send_reset_email
from flaskapp.models import User

users = Blueprint("users", __name__)


@users.route("/register", methods=["GET", "POST"])
def register():
    """Registeration of user

    Returns:
        HTML function/ page -- If user is authenticated then redirect to papers.home page.
        after submitting the form for registration go to login page.
        and when this page is load returns HTML function.
    """
    if current_user.is_authenticated:
        return redirect(url_for("papers.home"))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(
            form.password.data).decode("utf-8")
        user = User(username=form.username.data,
                    email=form.email.data,
                    password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash("Your account has been created! You are now able to log in",
              "success")
        return redirect(url_for("users.login"))
    return render_template(
        "users/register.html",
        title="Register",
        form=form,
        css_file="css/users/register.css",
        js_file="js/users/register.js",
        btn_name="Back",
    )


@users.route("/login", methods=["GET", "POST"])
def login():
    """Login into system

    Returns:
        HTML function/page -- If the user is authenticated then redirect to papers home page
        else after logging in(with validation of correct details) go to papers home page
        and while runnig this page gives tempalte of login.htm.
    """
    if current_user.is_authenticated:
        return redirect(url_for("papers.home"))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password,
                                               form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get("next")
            return (redirect(next_page) if next_page else redirect(
                    url_for("papers.home")))
        flash("Login Unsuccessful. Please check email and password", "danger")
    return render_template(
        "users/login.html",
        title="Login",
        form=form,
        css_file="css/users/login.css",
        js_file="js/users/login.js",
        btn_name="Back",
    )


@users.route("/logout")
@login_required
def logout():
    """For Logout

    Returns:
        Page -- It will redirect to mail index page
    """
    logout_user()
    return redirect(url_for("main.index"))


@users.route("/account", methods=["GET", "POST"])
@login_required
def account():
    """Accout of User

    Returns:
        Rendering page -- If user want to change profile pic or name or email.
        it will do it.
    """
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash("Your account has been updated!", "success")
        return redirect(url_for("users.account"))
    form.username.data = current_user.username
    form.email.data = current_user.email
    image_file = url_for("static",
                         filename="profile_pics/" + current_user.image_file)
    return render_template(
        "users/account.html",
        title="Account",
        css_file="css/base.css",
        css_file2="css/users/accounts.css",
        image_file=image_file,
        form=form,
        js_file="js/users/account.js",
    )


@users.route("/reset_password", methods=["GET", "POST"])
def reset_request():
    """For reset password

    Returns:
        Page -- If user want to reset password it will allow it by email verification.Mail will
        sent to user's mail and page will render to home login page.
    """
    if current_user.is_authenticated:
        return redirect(url_for("papers.home"))
    form = RequestResetForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        send_reset_email(user)
        flash(
            "An email has been sent with instructions to reset your password.",
            "info")
        return redirect(url_for("users.login"))
    return render_template(
        "users/reset_request.html",
        title="Reset Password",
        form=form,
        js_file="js/users/reset_password.js",
    )


@users.route("/reset_password/<token>", methods=["GET", "POST"])
def reset_token(token):
    """reset password's token

    Arguments:
        token {Token} -- Object

    Returns:
        page -- If user is authenticated then redirect to home page.
        If user is none then shows warning.else show a message with updated password and
        redirect to login page.
    """
    if current_user.is_authenticated:
        return redirect(url_for("papers.home"))
    user = User.verify_reset_token(token)
    if user is None:
        flash("That is an invalid or expired token", "warning")
        return redirect(url_for("users.reset_request"))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(
            form.password.data).decode("utf-8")
        user.password = hashed_password
        db.session.commit()
        flash("Your password has been updated! You are now able to log in",
              "success")
        return redirect(url_for("users.login"))
    return render_template(
        "users/reset_token.html",
        title="Reset Password",
        form=form,
        js_file="js/users/reset_password.js",
    )
