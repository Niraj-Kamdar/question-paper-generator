import os
import secrets

from flask import current_app
from flask import render_template
from flask_mail import Message
from flask_weasyprint import CSS
from flask_weasyprint import HTML
from PIL import Image
from sqlalchemy import and_
from sqlalchemy import func

from flaskapp import APP_PATH
from flaskapp import db
from flaskapp import mail
from flaskapp.models import Course
from flaskapp.models import Question
from flaskapp.models import Unit


class QuestionNotFoundError(Exception):
    """ Question that satisfies all given constraints doesn't exist in database."""


def find_conflicting_questions(course_id, constraints):
    unit = (db.session.query(Unit).filter(
        and_(Unit.chapter_no == constraints["unit"],
             Unit.course_id == course_id)).first())
    return (db.session.query(Question).filter(
        and_(
            Question.cognitive_level == constraints["cognitive"],
            Question.difficulty == constraints["difficulty"],
            Question.mark == constraints["mark"],
            Question.unit_id == unit.id,
            Question.question_type == constraints["question_type"],
            Question.imp is True,
            Question.is_asked is True,
        )).all())


def find_random_question(course_id, constraints):
    course = (db.session.query(Course).filter(Course.id == course_id)).first()
    unit = (db.session.query(Unit).filter(
        and_(Unit.chapter_no == constraints["unit"],
             Unit.course_id == course_id)).first())
    imp_question = (db.session.query(Question).filter_by(
        cognitive_level=constraints["cognitive"],
        difficulty=constraints["difficulty"],
        mark=constraints["mark"],
        unit_id=unit.id,
        imp=True,
        is_asked=False,
        question_type=constraints["question_type"],
    ).order_by(func.random()).first())
    if imp_question:
        if not course.include_asked:
            (db.session.query(Question).filter(
                Question.id == imp_question.id).update(
                    dict(is_asked=True), synchronize_session="fetch"))
            db.session.commit()
        return imp_question.to_dict()
    question = (db.session.query(Question).filter_by(
        cognitive_level=constraints["cognitive"],
        difficulty=constraints["difficulty"],
        mark=constraints["mark"],
        unit_id=unit.id,
        is_asked=False,
        question_type=constraints["question_type"],
    ).order_by(func.random()).first())
    if question:
        if not course.include_asked:
            (db.session.query(Question).filter(
                Question.id == question.id).update(
                    dict(is_asked=True), synchronize_session="fetch"))
            db.session.commit()
        return question.to_dict()
    raise QuestionNotFoundError()


def save_logo(form_picture):
    """Save profile picture

    Arguments:
        form_picture {form} -- Entered picture which user want to set to his profile

    Returns:
        string -- To save picture
    """
    logo_path = os.path.join(current_app.root_path, "static", "logos")
    if not os.path.exists(logo_path):
        os.makedirs(logo_path)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = secrets.token_urlsafe(10) + f_ext
    picture_path = os.path.join(logo_path, picture_fn)

    output_size = (400, 400)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn


def render_paper(paper):
    html = render_template(
        "papers/ptp.html",
        css_files=["css/ptp.css"],
        title="Paper-to-PDF",
        paper=paper,
    )
    css = """
    body { font: 2em Fontin, serif }
    nav { font-size: .7em }

    @page { size: A4; margin: 1cm }
    @media print {
        nav { display: none }
    }
    """
    filename = f"{paper.name}-{paper.exam_date}.pdf"
    return filename, HTML(string=html), CSS(string=css)


def email_pdf(examiner, user, paper):
    mail_file = os.path.join(APP_PATH, "templates", "papers",
                             "pdf-email-receipt", "content.txt")
    with open(mail_file, "r") as f:
        msg_text = f.read()

    msg_text = msg_text.format(exam=paper.name, date=paper.exam_date)
    msg_html = render_template("papers/pdf-email-receipt/content.html",
                               exam=paper.name,
                               date=paper.exam_date)
    msg = Message(f"Paper for {paper.name}",
                  sender="setnow@tuta.io",
                  recipients=[examiner, user])
    msg.body = msg_text
    msg.html = msg_html

    filename, html, css = render_paper(paper)
    pdf = html.write_pdf(stylesheets=[css])
    msg.attach(filename, "application/pdf", pdf)
    mail.send(msg)
