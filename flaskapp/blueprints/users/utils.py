import os

from PIL import Image
from flask import url_for, current_app, render_template
from flask_login import current_user
from flask_mail import Message

from flaskapp import mail, APP_PATH


def save_picture(form_picture):
    """Save profile picture
    
    Arguments:
        form_picture {form} -- Entered picture which user want to set to his profile
    
    Returns:
        string -- To save picture
    """
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = str(current_user.id) + f_ext
    picture_path = os.path.join(
        current_app.root_path, "static/profile_pics", picture_fn
    )

    output_size = (256, 256)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn


def send_reset_email(user):
    """For reset password make an email for existed user
    
    Arguments:
        user {object} -- To reset password. when user want to reset password this function 
        will send mail of reset password to user's submitted/registered mail for verification.
    """
    token = user.get_reset_token()
    mail_file = os.path.join(
        APP_PATH, "templates", "users", "password-reset", "content.txt"
    )
    with open(mail_file, "r") as f:
        msg_text = f.read()
    msg_text = msg_text.format(
        name=user.username,
        action_url=url_for("users.reset_token", token=token, _external=True),
        support_url=url_for("main.index"),
        operating_system="linux",
        browser_name="firefox",
    )
    msg_html = render_template(
        "users/password-reset/content.html",
        name=user.username,
        action_url=url_for("users.reset_token", token=token, _external=True),
        support_url=url_for("main.index"),
        operating_system="linux",
        browser_name="firefox",
    )
    msg = Message(
        "Password Reset Request", sender="setnow@tuta.io", recipients=[user.email]
    )
    msg.body = msg_text
    msg.html = msg_html
    mail.send(msg)
