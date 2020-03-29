from flaskapp import db


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    mark = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    imp = db.Column(db.Boolean, default=False)

    @db.validates("difficulty")
    def validate_difficulty(self, key, value):
        assert value in range(1, 101)
        return value

    @db.validates("mark")
    def validate_mark(self, key, value):
        assert value in range(1, 101)
        return value

    def __repr__(self):
        return f"Question({self.question}, {self.mark}, {self.difficulty}, {self.imp})"

    def to_dict(self):
        return dict(id=self.id,
                    question=self.question,
                    mark=self.mark,
                    difficulty=self.difficulty,
                    imp=self.imp)


class MCQQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    mark = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    imp = db.Column(db.Boolean, default=False)
    option1 = db.Column(db.Text, nullable=False)
    option2 = db.Column(db.Text, nullable=False)
    option3 = db.Column(db.Text, nullable=False)
    option4 = db.Column(db.Text, nullable=False)

    @db.validates("difficulty")
    def validate_difficulty(self, key, value):
        assert value in range(1, 11)
        return value

    @db.validates("mark")
    def validate_mark(self, key, value):
        assert value in range(1, 101)
        return value

    def __repr__(self):
        return f"MCQQuestion({self.question}, {self.mark}, {self.difficulty}, {self.imp}," \
               f" {self.option1}, {self.option2}, {self.option3}, {self.option4})"

    def to_dict(self):
        return dict(id=self.id,
                    question=self.question,
                    mark=self.mark,
                    difficulty=self.difficulty,
                    imp=self.imp,
                    option1=self.option1,
                    option2=self.option2,
                    option3=self.option3,
                    option4=self.option4)
