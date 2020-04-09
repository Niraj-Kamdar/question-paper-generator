import os

from flask import render_template
from flask_mail import Message

from flaskapp import mail, APP_PATH


def send_contact_us_email(**data):
    """We send email to ourself using this function
    """
    mail_file = os.path.join(APP_PATH, "templates", "main", "contact-us", "content.txt")
    with open(mail_file, "r") as f:
        msg_text = f.read()
    msg_text = msg_text.format(**data)
    msg_html = render_template("main/contact-us/content.html", **data)
    msg = Message(data["subject"],
                  sender='setnow@tuta.io',
                  recipients=['setnow@tuta.io'])
    msg.body = msg_text
    msg.html = msg_html
    mail.send(msg)


def send_contact_us_receipt_email(**data):
    """When user give their inputs to contact us. Then reply to that mail to user as receipt(reply) of 
    contact us mail.
    """
    mail_file = os.path.join(APP_PATH, "templates", "main", "contact-us-receipt", "content.txt")
    with open(mail_file, "r") as f:
        msg_text = f.read()
    msg_html = render_template("main/contact-us-receipt/content.html")
    msg = Message(f'[SetNow Support] Re: {data["subject"]}',
                  sender='setnow@tuta.io',
                  recipients=[data["email"]])
    msg.body = msg_text
    msg.html = msg_html
    mail.send(msg)
