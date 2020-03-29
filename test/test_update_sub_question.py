from flaskapp import models
from test.test_question import QuestionTestCase


class UpdateQuestionTestCase(QuestionTestCase):

    def test_update_question(self):
        # Test valid data
        # populate database with new questions.
        response1 = self.app.post("/question/sub/new",
                                  data=dict(question="Is it okay?", mark=8,
                                            difficulty=10, imp=None, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response1.status_code, 200)
        response2 = self.app.post("/question/sub/new",
                                  data=dict(question="Is it good?", mark=10,
                                            difficulty=20, imp=None, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response2.status_code, 200)
        response3 = self.app.post("/question/sub/new",
                                  data=dict(question="knight?", mark=9,
                                            difficulty=11, imp=True, submit="submit"),
                                  follow_redirects=True)
        self.assertEqual(response3.status_code, 200)

        update_question = dict(question="How many prime numbers between 1 to 100?", mark=5, difficulty=20, imp=True,
                               submit="submit")
        response = self.app.post("/question/sub/update/2",
                                 data=update_question,
                                 follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        q = self.session.query(models.Question).get(2)

        # Testing if repr method is working

        self.assertEqual(str(q), "Question(How many prime numbers between 1 to 100?, 5, 20, True)")

        response = self.app.post("/question/sub/update/4",
                                 data=update_question,
                                 follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Question:4 Does not exist", response.data)
