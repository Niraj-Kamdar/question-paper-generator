import os
import unittest
from test.main.utils import test_post_request

from flaskapp import APP_PATH, TEST_DB, config, create_app, db, mail, models


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
        super().setUp()
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
        super().setUp()
        self.login()
        new_course = dict(course="maths")
        test_post_request(self, "/course/new", new_course, models.Course, 1)

    def tearDown(self):
        """  Destroy blank temp database before each test   """
        self.logout()
        super().tearDown()


class BaseUnit(BaseCourse):
    def setUp(self):
        super().setUp()
        new_unit = dict(chapter_no=1, name="Permutations")
        test_post_request(self, "/course/1/unit/new", new_unit, models.Unit, 1)


class BaseSubQuestion(BaseUnit):
    def setUp(self):
        super().setUp()

        new_question = dict(
            question="Is it okay?",
            mark=8,
            difficulty="Easy",
            cognitive_level="Comprehension",
            imp=None,
            is_asked=True,
            submit="submit",
        )
        test_post_request(self, "/course/1/unit/1/question/sub/new/", new_question)

        new_question = dict(
            question="Is it question?",
            mark=7,
            difficulty="Hard",
            cognitive_level="Application",
            imp=True,
            is_asked=False,
            submit="submit",
        )
        test_post_request(self, "/course/1/unit/1/question/sub/new/", new_question)

        new_question = dict(
            question="What is it?",
            mark=2,
            difficulty="Medium",
            cognitive_level="Knowledge",
            imp=None,
            is_asked=True,
            submit="submit",
        )
        test_post_request(self, "/course/1/unit/1/question/sub/new/", new_question)

        new_question = dict(
            question="What was that?",
            mark=6,
            difficulty="Medium",
            cognitive_level="Application",
            imp=None,
            is_asked=False,
            submit="submit",
        )
        test_post_request(self, "/course/1/unit/1/question/sub/new/", new_question)

        new_question = dict(
            question="How are you?",
            mark=2,
            difficulty="Easy",
            cognitive_level="Knowledge",
            imp=True,
            is_asked=True,
            submit="submit",
        )
        test_post_request(self, "/course/1/unit/1/question/sub/new/", new_question)

        new_question = dict(
            question="is SEN easy?",
            mark=5,
            difficulty="Easy",
            cognitive_level="Application",
            imp=None,
            is_asked=False,
            submit="submit",
        )
        test_post_request(self, "/course/1/unit/1/question/sub/new/", new_question)

        new_question = dict(
            question="is IT easy?",
            mark=5,
            difficulty="Medium",
            cognitive_level="Comprehension",
            imp=None,
            is_asked=False,
            submit="submit",
        )
        test_post_request(self, "/course/1/unit/1/question/sub/new/", new_question)

        new_question = dict(
            question="is engineering easy?",
            mark=5,
            difficulty="Hard",
            cognitive_level="Knowledge",
            imp=None,
            is_asked=False,
            submit="submit",
        )
        test_post_request(self, "/course/1/unit/1/question/sub/new/", new_question)

        new_question = dict(
            question="Comprehension sub hard",
            mark=5,
            difficulty="Hard",
            cognitive_level="Comprehension",
            imp=None,
            is_asked=False,
            submit="submit",
        )
        test_post_request(self, "/course/1/unit/1/question/sub/new/", new_question)

        new_question = dict(
            question="this is one more really?",
            mark=5,
            difficulty="Hard",
            cognitive_level="Application",
            imp=None,
            is_asked=False,
            submit="submit",
        )
        test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question,
        )

        new_question = dict(
            question="Application med sub.",
            mark=5,
            difficulty="Medium",
            cognitive_level="Application",
            imp=None,
            is_asked=False,
            submit="submit",
        )
        test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question,
        )

        new_question = dict(
            question="Knowledge med sub.",
            mark=5,
            difficulty="Medium",
            cognitive_level="Knowledge",
            imp=None,
            is_asked=False,
            submit="submit",
        )
        test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question,
        )

        new_question = dict(
            question="Comprehension sub easy",
            mark=5,
            difficulty="Easy",
            cognitive_level="Comprehension",
            imp=None,
            is_asked=False,
            submit="submit",
        )
        test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question,
        )

        new_question = dict(
            question="Knowledge sub easy",
            mark=5,
            difficulty="Easy",
            cognitive_level="Knowledge",
            imp=None,
            is_asked=False,
            submit="submit",
        )
        test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question,
        )


class BaseMCQQuestion(BaseUnit):
    def setUp(self):
        super().setUp()

        new_question = dict(
            question="Is it okay?",
            mark=8,
            difficulty="Easy",
            cognitive_level="Knowledge",
            imp=None,
            is_asked=True,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="Is it question?",
            mark=7,
            difficulty="Medium",
            cognitive_level="Application",
            imp=True,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="What is it?",
            mark=2,
            difficulty="Hard",
            cognitive_level="Application",
            imp=None,
            is_asked=True,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="What was that?",
            mark=6,
            difficulty="Easy",
            cognitive_level="Knowledge",
            imp=None,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="How are you?",
            mark=2,
            difficulty="Easy",
            cognitive_level="Knowledge",
            imp=True,
            is_asked=True,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="is Project complete?",
            mark=5,
            difficulty="Easy",
            cognitive_level="Application",
            imp=None,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )
        new_question = dict(
            question="is engineering complete?",
            mark=5,
            difficulty="Medium",
            cognitive_level="Comprehension",
            imp=None,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="did you get degree?",
            mark=5,
            difficulty="Hard",
            cognitive_level="Application",
            imp=None,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="Comprehension mcq hard",
            mark=5,
            difficulty="Hard",
            cognitive_level="Comprehension",
            imp=None,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="Knowledge mcq hard",
            mark=5,
            difficulty="Hard",
            cognitive_level="Comprehension",
            imp=None,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="Knowledge mcq med",
            mark=5,
            difficulty="Medium",
            cognitive_level="Knowledge",
            imp=None,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="Application mcq med",
            mark=5,
            difficulty="Medium",
            cognitive_level="Application",
            imp=None,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="Comprehension mcq easy",
            mark=5,
            difficulty="Easy",
            cognitive_level="Comprehension",
            imp=None,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )

        new_question = dict(
            question="Knowledge mcq easy",
            mark=5,
            difficulty="Easy",
            cognitive_level="Knowledge",
            imp=None,
            is_asked=False,
            submit="submit",
            option1="A",
            option2="B",
            option3="C",
            option4="D",
        )
        test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_question,
        )
