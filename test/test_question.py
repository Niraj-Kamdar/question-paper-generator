import os
import unittest

from flask_sqlalchemy import orm, sqlalchemy
from flaskapp import app, db

sessionmaker = orm.sessionmaker
create_engine = sqlalchemy.create_engine

TEST_DB = "test.db"


class QuestionTestCase(unittest.TestCase):
    def setUp(self):
        """Set up a blank temp database before each test"""
        basedir = os.path.abspath(".")
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
