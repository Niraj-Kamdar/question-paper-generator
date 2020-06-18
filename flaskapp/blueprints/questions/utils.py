from flaskapp import db


def update_imp(question, obj):
    db.session.query(question).filter(question.id.in_(obj.get("imp", []))).update(
        dict(imp=True), synchronize_session="fetch"
    )
    db.session.query(question).filter(question.id.in_(obj.get("notimp", []))).update(
        dict(imp=False), synchronize_session="fetch"
    )
    db.session.commit()
