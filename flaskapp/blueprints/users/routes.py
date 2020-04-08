from flask import redirect, url_for, flash, render_template, request, Blueprint
from flask_login import current_user, login_user, login_required, logout_user

from flaskapp import bcrypt, db
from flaskapp.blueprints.users.forms import RegistrationForm, LoginForm, UpdateAccountForm, RequestResetForm, \
    ResetPasswordForm
from flaskapp.blueprints.users.utils import save_picture, send_reset_email
from flaskapp.models import User

users = Blueprint('users', __name__)


@users.route("/register", methods=['GET', 'POST'])
#If successfully registered than shows message of that and save password and username to the database
#Redirecting to the papers.home page.
def register():
    if current_user.is_authenticated:
        return redirect(url_for('papers.home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('users.login'))
    return render_template('users/register.html', title='Register', form=form, css_file='css/users/register.css',
                           js_file='js/index.js', js_file2='js/users/register.js', btn_name='Back')


@users.route("/login", methods=['GET', 'POST'])
#If user is authenticated and login is succesfully occures shows message of successfully logged in
# Redict to papers.home page 
def login():
    if current_user.is_authenticated:
        return redirect(url_for('papers.home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('papers.home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('users/login.html', title='Login', form=form, css_file='css/users/login.css',
                           js_file='js/index.js', js_file2='js/users/login.js', btn_name='Back')


@users.route("/logout")
@login_required
#for logout from current account and end session
#Redirect to main index page (login page).
def logout():
    logout_user()
    return redirect(url_for('main.index'))


@users.route("/account", methods=['GET', 'POST'])
@login_required
#To make an account of user
#To set name,email or profile pic: function changes to it.
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('users.account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template('users/account.html', title='Account', css_file='css/users/accounts.css',
                           image_file=image_file, form=form, js_file='js/users/account.js')


@users.route("/reset_password", methods=['GET', 'POST'])
#To reset password send varification to submitted email then redirect to login page
def reset_request():
    if current_user.is_authenticated:
        return redirect(url_for("papers.home"))
    form = RequestResetForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        send_reset_email(user)
        flash('An email has been sent with instructions to reset your password.', 'info')
        return redirect(url_for('users.login'))
    return render_template('users/reset_request.html', title='Reset Password', form=form,
                           js_file='js/users/reset_password.js')


@users.route("/reset_password/<token>", methods=['GET', 'POST'])
#To set new password take token and set new password 
#Print message that "Your password has been updated! You are now able to log in."
#then redirect to login page.
def reset_token(token):
    if current_user.is_authenticated:
        return redirect(url_for('papers.home'))
    user = User.verify_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token', 'warning')
        return redirect(url_for('users.reset_request'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        flash('Your password has been updated! You are now able to log in', 'success')
        return redirect(url_for('users.login'))
    return render_template('users/reset_token.html', title='Reset Password', form=form,
                           js_file='js/users/reset_password.js')
