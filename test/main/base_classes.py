import unittest

from flaskapp import create_app, db, config, models, mail
from test.main.utils import test_post_request


class BaseDatabase(unittest.TestCase):
    def setUp(self):
        """Set up a blank temp database before each test"""
        self.app = create_app(config_class=config.TestingConfig)
        self.app.app_context().push()

        self.mail = mail

        self.db = db
        self.db.create_all()

    def tearDown(self):
        """Destroy blank temp database after each test"""
        db.drop_all()


class BaseUser(BaseDatabase):
    def setUp(self):
        BaseDatabase.setUp(self)
        self.client = self.app.test_client()
        new_user = dict(username="pr.proton", email="proton@gmail.com", password="proton@101",
                        confirm_password="proton@101", submit="Sign Up")
        test_post_request(self, "/register", new_user, models.User, 1)

    def login(self):
        user = dict(email="proton@gmail.com", password="proton@101", remember=True, submit="Login")
        test_post_request(self, "/login", user)

    def logout(self):
        self.client.get("/logout")


class BaseCourse(BaseUser):
    def setUp(self):
        """Set up a blank temp database before each test"""
        BaseUser.setUp(self)
        self.login()
        new_course = dict(course="maths")
        test_post_request(self, "/course/new", new_course, models.Course, 1)

    def tearDown(self):
        self.logout()
        BaseDatabase.tearDown(self)


class BaseSubQuestion(BaseCourse):
    def setUp(self):
        BaseCourse.setUp(self)

        new_question = dict(question="Is it okay?", mark=8, difficulty=10, imp=None, submit="submit")
        test_post_request(self, "/course/1/question/sub/new/", new_question, models.Question, 1)

        new_question = dict(question="Is it question?", mark=7, difficulty=50, imp=True, submit="submit")
        test_post_request(self, "/course/1/question/sub/new/", new_question, models.Question, 2)

        new_question = dict(question="What is it?", mark=2, difficulty=70, imp=None, submit="submit")
        test_post_request(self, "/course/1/question/sub/new/", new_question, models.Question, 3)

        new_question = dict(question="What was that?", mark=6, difficulty=20, imp=None, submit="submit")
        test_post_request(self, "/course/1/question/sub/new/", new_question, models.Question, 4)

        new_question = dict(question="How are you?", mark=2, difficulty=40, imp=True, submit="submit")
        test_post_request(self, "/course/1/question/sub/new/", new_question, models.Question, 5)


class BaseMCQQuestion(BaseCourse):
    def setUp(self):
        BaseCourse.setUp(self)

        new_question = dict(question="Is it okay?", mark=8, difficulty=10, imp=None, submit="submit",
                            option1="A", option2="B", option3="C", option4="D")
        test_post_request(self, "/course/1/question/mcq/new/", new_question, models.MCQQuestion, 1)

        new_question = dict(question="Is it question?", mark=7, difficulty=50, imp=True, submit="submit",
                            option1="A", option2="B", option3="C", option4="D")
        test_post_request(self, "/course/1/question/mcq/new/", new_question, models.MCQQuestion, 2)

        new_question = dict(question="What is it?", mark=2, difficulty=70, imp=None, submit="submit",
                            option1="A", option2="B", option3="C", option4="D")
        test_post_request(self, "/course/1/question/mcq/new/", new_question, models.MCQQuestion, 3)

        new_question = dict(question="What was that?", mark=6, difficulty=20, imp=None, submit="submit",
                            option1="A", option2="B", option3="C", option4="D")
        test_post_request(self, "/course/1/question/mcq/new/", new_question, models.MCQQuestion, 4)

        new_question = dict(question="How are you?", mark=2, difficulty=40, imp=True, submit="submit",
                            option1="A", option2="B", option3="C", option4="D")
        test_post_request(self, "/course/1/question/mcq/new/", new_question, models.MCQQuestion, 5)
