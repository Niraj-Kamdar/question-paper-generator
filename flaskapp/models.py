from flaskapp import db


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    mark = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    imp = db.Column(db.Boolean, default=False)
    option1 = db.Column(db.Text,nullable=True,default = None)
    option2 = db.Column(db.Text,nullable=True,default = None)
    option3 = db.Column(db.Text,nullable=True,default = None)
    option4 = db.Column(db.Text,nullable=True,default = None)  
    def __repr__(self):
        return f"Question({self.question}, {self.mark}, {self.difficulty}, {self.imp})"

    def to_dict(self):
        return dict(id=self.id,
                    question=self.question,
                    mark=self.mark,
                    difficulty=self.difficulty,
                    imp=self.imp,
                    option1 = self.option1,
                    option2 = self.option2,
                    option3 = self.option3,
                    option4 = self.option4)
