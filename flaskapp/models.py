from flaskapp import db


class Question(db.model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    mark = db.column(db.Integer, nullable=False)
    difficulty = db.column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Question({self.question}, {self.mark}, {self.difficulty})"