import os
import unittest
from flaskapp import app


class BasicTestCase(unittest.TestCase):
    def test_index(self):
        tester = app.test_client(self)
        response = tester.get("/", content_type="html/text")
        self.assertEqual(response.status_code, 200)

    def test_database(self):
        tester = os.path.exists("flaskapp/site.db")
        self.assertTrue(tester)
