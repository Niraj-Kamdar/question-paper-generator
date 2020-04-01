from flask import current_app
from flask_login import UserMixin
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

from flaskapp import db, login_manager


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    courses = db.relationship('Course', backref='teacher', lazy=True)

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f"User({self.username}, {self.email}, {self.image_file})"


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    questions = db.relationship('Question', backref='course', lazy=True)
    mcq_questions = db.relationship("MCQQuestion", backref='course', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return f"Course({self.name})"


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    mark = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    imp = db.Column(db.Boolean, default=False)
    course_id = db.Column(db.Integer, db.ForeignKey("course.id"), nullable=False)

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
    course_id = db.Column(db.Integer, db.ForeignKey("course.id"), nullable=False)

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
