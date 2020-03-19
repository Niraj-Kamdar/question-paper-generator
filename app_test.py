import os
import unittest

from flask_sqlalchemy import orm, sqlalchemy

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

    def test_imp(self):
        response = self.app.get('/question/imp/["imp":[1,2],"notimp":[3]]',
                                 follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        q1 = self.session.query(1)
        q2 = self.session.query(2)
        q3 = self.session.query(3)
        self.assertEqual(str(q1.imp), "True")
        self.assertEqual(str(q2.imp), "True")
        self.assertEqual(str(q3.imp), "False")

    def tearDown(self):
        """Destroy blank temp database after each test"""
        db.drop_all()


if __name__ == '__main__':
    unittest.main()
