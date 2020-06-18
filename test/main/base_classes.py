import os
import unittest

from flaskapp import APP_PATH
from flaskapp import config
from flaskapp import create_app
from flaskapp import db
from flaskapp import mail
from flaskapp import models
from flaskapp import TEST_DB
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
        db.close_all_sessions()
        os.remove(os.path.join(APP_PATH, TEST_DB))


class BaseUser(BaseDatabase):
    def setUp(self):
        """Setup for user

        Arguments:
            BaseDatabase {[type]} -- [description]
        """
        BaseDatabase.setUp(self)
        self.client = self.app.test_client()
        new_user = dict(
            username="pr.proton",
            email="proton@gmail.com",
            password="proton@101",
            confirm_password="proton@101",
            submit="Sign Up",
        )
        test_post_request(self, "/register", new_user, models.User, 1)

    def login(self):
        """[User login]
        """
        user = dict(
            email="proton@gmail.com",
            password="proton@101",
            remember=True,
            submit="Login",
        )
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
        """  Destroy blank temp database before each test   """
        self.logout()
        BaseDatabase.tearDown(self)


class BaseUnit(BaseCourse):
    def setUp(self):
        BaseCourse.setUp(self)
        new_unit = dict(chapter_no=1, name="Permutations")
        test_post_request(self, "/course/1/unit/new", new_unit, models.Unit, 1)


class BaseSubQuestion(BaseUnit):
    def setUp(self):
        BaseUnit.setUp(self)

        new_question = dict(
            question="Is it okay?",
            mark=8,
            difficulty="Easy",
            cognitive_level="Comprehension",
            imp=None,
            submit="submit",
        )
        test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question, models.Question, 1
        )

        new_question = dict(
            question="Is it question?",
            mark=7,
            difficulty="Hard",
            cognitive_level="Application",
            imp=True,
            submit="submit",
        )
        test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question, models.Question, 2
        )

        new_question = dict(
            question="What is it?",
            mark=2,
            difficulty="Medium",
            cognitive_level="Knowledge",
            imp=None,
            submit="submit",
        )
        test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question, models.Question, 3
        )

        new_question = dict(
            question="What was that?",
            mark=6,
            difficulty="Medium",
            cognitive_level="Application",
            imp=None,
            submit="submit",
        )
        test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question, models.Question, 4
        )

        new_question = dict(
            question="How are you?",
            mark=2,
            difficulty="Easy",
            cognitive_level="Knowledge",
            imp=True,
            submit="submit",
        )
        test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question, models.Question, 5
        )


class BaseMCQQuestion(BaseUnit):
    def setUp(self):
        BaseUnit.setUp(self)

        new_question = dict(
            question="Is it okay?",
            mark=8,
            difficulty="Easy",
            cognitive_level="Knowledge",
            imp=None,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self,
            "/course/1/unit/1/question/mcq/new/",
            new_question,
            models.Question,
            1,
        )

        new_question = dict(
            question="Is it question?",
            mark=7,
            difficulty="Medium",
            cognitive_level="Application",
            imp=True,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self,
            "/course/1/unit/1/question/mcq/new/",
            new_question,
            models.Question,
            2,
        )

        new_question = dict(
            question="What is it?",
            mark=2,
            difficulty="Hard",
            cognitive_level="Application",
            imp=None,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self,
            "/course/1/unit/1/question/mcq/new/",
            new_question,
            models.Question,
            3,
        )

        new_question = dict(
            question="What was that?",
            mark=6,
            difficulty="Easy",
            cognitive_level="Knowledge",
            imp=None,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self,
            "/course/1/unit/1/question/mcq/new/",
            new_question,
            models.Question,
            4,
        )

        new_question = dict(
            question="How are you?",
            mark=2,
            difficulty="Easy",
            cognitive_level="Knowledge",
            imp=True,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self,
            "/course/1/unit/1/question/mcq/new/",
            new_question,
            models.Question,
            5,
        )
