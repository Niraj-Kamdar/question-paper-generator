from flaskapp import db


def update_imp(question, obj):
    """Update given IMP flag of given question

    Args:
        question (object): Description of question
        obj (object): Description of setting flag
    """
    db.session.query(question).filter(question.id.in_(obj["imp"])).update(
        dict(imp=True), synchronize_session="fetch"
    )
    db.session.query(question).filter(question.id.in_(obj["notimp"])).update(
        dict(imp=False), synchronize_session="fetch"
    )
    db.session.commit()
