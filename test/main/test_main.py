import os
import unittest
from test.main.base_classes import BaseDatabase

from flaskapp import APP_PATH, TEST_DB, create_app


class BasicTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()

    def test_index(self):
        tester = self.app.test_client(self)
        response = tester.get("/", content_type="html/text")
        self.assertEqual(response.status_code, 200)


class TestingDatabaseTestCase(BaseDatabase):
    def test_database(self):
        tester = os.path.join(APP_PATH, TEST_DB)
        self.assertTrue(os.path.isfile(tester))
