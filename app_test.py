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


class AddQuestionTestCase(unittest.TestCase):
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

    def test_add_question(self):
        response = self.app.post("/question/new",
                                 data=dict(question="Is it okay?", mark="8", difficulty=10, imp=True, submit="submit"),
                                 follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        q = self.session.query(models.Question).first()
        self.assertEqual(str(q), "Question(Is it okay?, 8, 10, True)")

    def tearDown(self):
        """Destroy blank temp database after each test"""
        db.drop_all()


class impfunction(unittest.TestCase):
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

    def test_imp(self):
        imp_dict = dict(imp=[1, 2], notimp=[3])
        d = json.dumps(imp_dict)
        response1 = self.app.post("/question/new",
                                  data=dict(question="Is it okay?", mark="8",
                                   difficulty=10, imp=False, submit="submit"),
                                  follow_redirects=True)
        response2 = self.app.post("/question/new",
                                  data=dict(question="Is it good?", mark="10",
                                   difficulty=20, imp=False, submit="submit"),
                                  follow_redirects=True)
        response3 = self.app.post("/question/new",
                                  data=dict(question="knight?", mark="9",
                                   difficulty=11, imp=True, submit="submit"),
                                  follow_redirects=True)
        response = self.app.get("/question/imp/{0}".format(d), follow_redirects=True)
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response3.status_code, 200)
        self.assertEqual(response.status_code, 200)
        q1 = self.session.query(models.Question).first()
        q2 = self.session.query(models.Question).get(2)
        q3 = self.session.query(models.Question).get(3)
        self.assertEqual(str(q1.imp), "True")
        self.assertEqual(str(q2.imp), "True")
        self.assertEqual(str(q3.imp), "False")

    def tearDown(self):
        """Destroy blank temp database after each test"""
        db.drop_all()


if __name__ == '__main__':
    unittest.main()
