from flaskapp import db


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    mark = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    imp = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"Question({self.question}, {self.mark}, {self.difficulty}, {self.imp})"

    def to_dict(self):
        return dict(id=self.id,
                    question=self.question,
                    mark=self.mark,
                    difficulty=self.difficulty,
                    imp=self.imp)
                    
class mcqQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    mark = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    imp = db.Column(db.Boolean, default=False)
    option1 = db.Column(db.Text, nullable=False)
    option2 = db.Column(db.Text, nullable=False)
    option3 = db.Column(db.Text, nullable=False)
    option4 = db.Column(db.Text, nullable=False)
    is_mcq = db.Column(db.Boolean, default=True)