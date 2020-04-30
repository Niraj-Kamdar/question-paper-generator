import os

from flask import render_template
from flask_mail import Message

from flaskapp import APP_PATH
from flaskapp import mail


def send_contact_us_email(**data):
    """
    It will send an email with name, email, subject and message filled by our user on contact us page to ourselves.   
    """
    mail_file = os.path.join(APP_PATH, "templates", "main", "contact-us", "content.txt")
    with open(mail_file, "r") as f:
        msg_text = f.read()
    msg_text = msg_text.format(**data)
    msg_html = render_template("main/contact-us/content.html", **data)
    msg = Message(
        data["subject"], sender="setnow@tuta.io", recipients=["setnow@tuta.io"]
    )
    msg.body = msg_text
    msg.html = msg_html
    mail.send(msg)


def send_contact_us_receipt_email(**data):
    """
    It will send an email to the user who has submitted his message on contact us page,
    stating SetNow has recieved your email.
    """
    mail_file = os.path.join(
        APP_PATH, "templates", "main", "contact-us-receipt", "content.txt"
    )
    with open(mail_file, "r") as f:
        msg_text = f.read()
    msg_html = render_template("main/contact-us-receipt/content.html")
    msg = Message(
        f'[SetNow Support] Re: {data["subject"]}',
        sender="setnow@tuta.io",
        recipients=[data["email"]],
    )
    msg.body = msg_text
    msg.html = msg_html
    mail.send(msg)
