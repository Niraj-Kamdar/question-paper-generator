from flask import current_app
from flask_login import UserMixin
from flaskapp import db, login_manager
from flaskapp.utils import CognitiveEnum, DifficultyEnum, default_instructions
from itsdangerous import BadSignature
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer


@login_manager.user_loader
def load_user(user_id):
    """Load User as current_user from the Database

    Returns:
        int(ID)  -- Load the user by giving user-ID
    """
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default="default.svg")
    password = db.Column(db.String(60), nullable=False)
    courses = db.relationship(
        "Course", backref="teacher", lazy=True, cascade="all, delete-orphan"
    )

    def get_reset_token(self, expires_sec=86400):
        s = Serializer(current_app.config["SECRET_KEY"], expires_sec)
        return s.dumps({"user_id": self.id}).decode("utf-8")

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config["SECRET_KEY"])
        try:
            user_id = s.loads(token)["user_id"]
        except BadSignature:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f"User({self.username}, {self.email}, {self.image_file})"

    def to_dict(self):
        return dict(
            id=self.id,
            username=self.username,
            email=self.email,
            image_file=self.image_file,
        )


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    include_asked = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    units = db.relationship(
        "Unit", backref="course", lazy=True, cascade="all, delete-orphan"
    )
    papers = db.relationship(
        "Paper", backref="course", lazy=True, cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"Course({self.name})"

    def to_dict(self):
        return dict(id=self.id, course=self.name)


class Unit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chapter_no = db.Column(db.Integer, nullable=False)
    name = db.Column(db.Text, nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey("course.id"), nullable=False)
    questions = db.relationship(
        "Question", backref="unit", lazy=True, cascade="all, delete-orphan"
    )
    mcq_questions = db.relationship(
        "MCQQuestion", backref="unit", lazy=True, cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"Unit({self.chapter_no, self.name})"

    def to_dict(self):
        return dict(id=self.id, chapter_no=self.chapter_no, name=self.name)


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    mark = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Enum(DifficultyEnum), nullable=False)
    cognitive_level = db.Column(db.Enum(CognitiveEnum), nullable=False,)
    imp = db.Column(db.Boolean, default=False)
    is_asked = db.Column(db.Boolean, default=False)
    unit_id = db.Column(db.Integer, db.ForeignKey("unit.id"), nullable=False)

    def __repr__(self):
        return f"Question({self.question}, {self.mark}, {self.difficulty}, {self.cognitive_level}, {self.imp})"

    def to_dict(self):
        return dict(
            id=self.id,
            question=self.question,
            mark=self.mark,
            difficulty=self.difficulty.name,
            cognitive_level=self.cognitive_level.name,
            imp=self.imp,
        )


class MCQQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    mark = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Enum(DifficultyEnum), nullable=False)
    cognitive_level = db.Column(db.Enum(CognitiveEnum), nullable=False,)
    is_asked = db.Column(db.Boolean, default=False)
    imp = db.Column(db.Boolean, default=False)
    option1 = db.Column(db.Text, nullable=False)
    option2 = db.Column(db.Text, nullable=False)
    option3 = db.Column(db.Text, nullable=False)
    option4 = db.Column(db.Text, nullable=False)
    unit_id = db.Column(db.Integer, db.ForeignKey("unit.id"), nullable=False)

    def __repr__(self):
        return (
            f"MCQQuestion({self.question}, {self.mark}, {self.difficulty}, {self.cognitive_level}, {self.imp},"
            f" {self.option1}, {self.option2}, {self.option3}, {self.option4})"
        )

    def to_dict(self):
        return dict(
            id=self.id,
            question=self.question,
            mark=self.mark,
            difficulty=self.difficulty.name,
            cognitive_level=self.cognitive_level.name,
            imp=self.imp,
            option1=self.option1,
            option2=self.option2,
            option3=self.option3,
            option4=self.option4,
        )


class Paper(db.Model):
    """ paper format matrix (values are id of question)
             a     b     c     d
        1 [[50,    4,    6      ],
        2  [3,    43,   12,   67],
        3  [14,  102            ]]
    """

    id = db.Column(db.Integer, primary_key=True)
    # Metadata
    name = db.Column(db.Text, nullable=False)
    paper_logo = db.Column(db.Text, nullable=False, default="logo.svg")
    term = db.Column(db.Text, nullable=False)
    exam_date = db.Column(db.Date, nullable=False)
    time_limit = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.JSON, nullable=True, default=default_instructions)
    course_id = db.Column(db.Integer, db.ForeignKey("course.id"), nullable=False)

    mark = db.Column(db.Integer, nullable=False)
    # # {easy: 30 mark, medium: 10 mark, hard: 10 mark }
    # difficulty = db.Column(db.JSON, nullable=False)
    # # {K: 30 mark, C: 10 mark, A: 10 mark }
    # cognitive_level = db.Column(db.JSON, nullable=False)
    paper_format = db.Column(db.JSON, nullable=False)

    def to_dict(self):
        return dict(
            id=self.id,
            name=self.name,
            term=self.term,
            mark=self.mark,
            difficulty=self.difficulty,
            cognitive_level=self.cognitive_level,
            paper_format=self.paper_format,
            paper_logo=self.paper_logo,
            exam_date=self.exam_date,
            time_limit=self.time_limit,
            instructions=self.instructions,
        )
