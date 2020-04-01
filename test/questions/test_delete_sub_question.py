import json

from flaskapp import models
from test.main.test_database import DatabaseTestCase


class DeleteSetTestCase(DatabaseTestCase):

    def test_delete_question(self):
        # Test valid data
        # populate database with new questions.
        response1 = self.app.post("/question/sub/new",
                                  data=dict(question="Isn't it okay?", mark=8,
                                            difficulty=10, imp=None, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response1.status_code, 200)
        response2 = self.app.post("/question/sub/new",
                                  data=dict(question="Isn't it good?", mark=10,
                                            difficulty=20, imp=None, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response2.status_code, 200)
        response3 = self.app.post("/question/sub/new",
                                  data=dict(question="Is it knight?", mark=9,
                                            difficulty=11, imp=True, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response3.status_code, 200)

        # Actual delete question get request.
        delete_list = [1, 3]
        d = json.dumps(delete_list)
        response = self.app.get(f"/question/sub/delete/{d}", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # check changes are reflected in database
        q1 = self.session.query(models.Question).get(1)
        q2 = self.session.query(models.Question).get(2)
        q3 = self.session.query(models.Question).get(3)
        self.assertEqual(q1, None)
        self.assertEqual(str(q2), "Question(Isn't it good?, 10, 20, False)")
        self.assertEqual(q3, None)
