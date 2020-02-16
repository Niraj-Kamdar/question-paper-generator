from app import app
import unittest


class MyTestCase(unittest.TestCase):
    def test_index(self):
        tester =  app.test_client(self)
        response = tester.get("/", content_type="html/text")
        self.assertEqual(response.status_code, 200)

    def test_question(self):
        tester = app.test_client(self)
        response = tester.get("/question", content_type="html/text")
        self.assertEqual(response.status_code, 200)
        data = {}
        response = tester.post("/question", data=data)
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
