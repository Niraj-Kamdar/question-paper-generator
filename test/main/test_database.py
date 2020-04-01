import os
import unittest

from flask_sqlalchemy import orm, sqlalchemy

from flaskapp import create_app, db, config, APP_PATH, TEST_DB

sessionmaker = orm.sessionmaker
create_engine = sqlalchemy.create_engine


class DatabaseTestCase(unittest.TestCase):
    def setUp(self):
        """Set up a blank temp database before each test"""
        self.app = create_app(config_class=config.TestingConfig)
        self.app.app_context().push()

        self.db = db
        self.db.create_all()

        self.app = self.app.test_client()

    def test_database(self):
        tester = os.path.join(APP_PATH, TEST_DB)
        self.assertTrue(os.path.isfile(tester))

    def tearDown(self):
        """Destroy blank temp database after each test"""
        db.drop_all()
