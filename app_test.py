import os
import unittest

from flask_sqlalchemy import orm, sqlalchemy
from flask import json
from flaskapp import app, db, models

sessionmaker = orm.sessionmaker
create_engine = sqlalchemy.create_engine

TEST_DB = "test.db"


class BasicTestCase(unittest.TestCase):
    def test_index(self):
        tester = app.test_client(self)
        response = tester.get("/", content_type="html/text")
        self.assertEqual(response.status_code, 200)

    def test_database(self):
        tester = os.path.exists("flaskapp/site.db")
        self.assertTrue(tester)


class QuestionTestCase(unittest.TestCase):
    def setUp(self):
        """Set up a blank temp database before each test"""
        basedir = os.path.abspath(os.path.dirname(__file__))
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
                                                os.path.join(basedir, "flaskapp", TEST_DB)
        self.app = app.test_client()
        db.create_all()
        app.config['WTF_CSRF_ENABLED'] = False
        Session = sessionmaker(bind=create_engine(app.config['SQLALCHEMY_DATABASE_URI']), autoflush=True)
        self.session = Session()

    def test_database(self):
        tester = os.path.exists("flaskapp/test.db")
        self.assertTrue(tester)

    def tearDown(self):
        """Destroy blank temp database after each test"""
        db.drop_all()


class AddQuestionTestCase(QuestionTestCase):

    def test_add_question(self):
        # Test valid data
        new_question = dict(question="Is it okay?", mark=8, difficulty=10, imp=True, submit="submit")
        response = self.app.post("/question/new",
                                 data=new_question,
                                 follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        q = self.session.query(models.Question).first()

        # Testing if repr method is working
        self.assertEqual(str(q), "Question(Is it okay?, 8, 10, True)")

        # DO appropriate changes in new_question to match database result
        del new_question["submit"]
        new_question["id"] = 1
        self.assertEqual(q.to_dict(), new_question)

        # Test invalid data
        response = self.app.post("/question/new",
                                 data=dict(question="Isn't it okay?", mark=None, difficulty="1", imp=False,
                                           submit="submit"),
                                 follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # Check changes are reflected in database
        q = self.session.query(models.Question).get(2)
        self.assertEqual(q, None)


class IMPSetTestCase(QuestionTestCase):

    def test_imp_question(self):
        # Test valid data
        # populate database with new questions.
        response1 = self.app.post("/question/new",
                                  data=dict(question="Is it okay?", mark=8,
                                            difficulty=10, imp=None, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response1.status_code, 200)
        response2 = self.app.post("/question/new",
                                  data=dict(question="Is it good?", mark=10,
                                            difficulty=20, imp=None, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response2.status_code, 200)
        response3 = self.app.post("/question/new",
                                  data=dict(question="knight?", mark=9,
                                            difficulty=11, imp=True, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response3.status_code, 200)

        # Actual set imp get request.
        imp_dict = dict(imp=[1, 2], notimp=[3])
        d = json.dumps(imp_dict)
        response = self.app.get(f"/question/imp/{d}", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # check changes are reflected in database
        q1 = self.session.query(models.Question).first()
        q2 = self.session.query(models.Question).get(2)
        q3 = self.session.query(models.Question).get(3)
        self.assertEqual(q1.imp, True)
        self.assertEqual(q2.imp, True)
        self.assertEqual(q3.imp, False)


class DeleteSetTestCase(QuestionTestCase):

    def test_delete_question(self):
        # Test valid data
        # populate database with new questions.
        response1 = self.app.post("/question/new",
                                  data=dict(question="Isn't it okay?", mark=8,
                                            difficulty=10, imp=None, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response1.status_code, 200)
        response2 = self.app.post("/question/new",
                                  data=dict(question="Isn't it good?", mark=10,
                                            difficulty=20, imp=None, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response2.status_code, 200)
        response3 = self.app.post("/question/new",
                                  data=dict(question="Is it knight?", mark=9,
                                            difficulty=11, imp=True, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response3.status_code, 200)

        # Actual delete question get request.
        delete_list = [1, 3]
        d = json.dumps(delete_list)
        response = self.app.get(f"/question/delete/{d}", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # check changes are reflected in database
        q1 = self.session.query(models.Question).get(1)
        q2 = self.session.query(models.Question).get(2)
        q3 = self.session.query(models.Question).get(3)
        self.assertEqual(q1, None)
        self.assertEqual(str(q2), "Question(Isn't it good?, 10, 20, False)")
        self.assertEqual(q3, None)


if __name__ == '__main__':
    unittest.main()
