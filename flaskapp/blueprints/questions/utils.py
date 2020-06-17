from flaskapp import db


def update_imp(question, obj):
    """Update question to IMP or set IMP flag

    """
    db.session.query(question).filter(question.id.in_(obj["imp"])).update(
        dict(imp=True), synchronize_session="fetch"
    )
    db.session.query(question).filter(question.id.in_(obj["notimp"])).update(
        dict(imp=False), synchronize_session="fetch"
    )
    db.session.commit()
