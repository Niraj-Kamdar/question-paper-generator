import os
import unittest

from flaskapp import create_app, APP_PATH


class BasicTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app()

    def test_index(self):
        tester = self.app.test_client(self)
        response = tester.get("/", content_type="html/text")
        self.assertEqual(response.status_code, 200)

    def test_database(self):
        tester = os.path.join(APP_PATH, "site.db")
        self.assertTrue(os.path.isfile(tester))
