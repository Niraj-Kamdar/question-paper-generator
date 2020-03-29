from flaskapp import models

from test.test_question import QuestionTestCase


class AddQuestionTestCase(QuestionTestCase):

    def test_add_question(self):
        # Test valid data
        new_question = dict(question="Is it okay?", mark=8, difficulty=10, imp=True, submit="submit")
        response = self.app.post("/question/sub/new/",
                                 data=new_question,
                                 follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        q = self.session.query(models.Question).first()

        # Testing if repr method is working
        self.assertEqual(str(q), "Question(Is it okay?, 8, 10, True)")

        # DO appropriate changes in new_question to match database result
        del new_question["submit"]
        new_question["id"] = 1
        self.assertEqual(q.to_dict(), new_question)

        # Test invalid data
        response = self.app.post("/question/sub/new/",
                                 data=dict(question="Isn't it okay?", mark=None, difficulty="1", imp=False,
                                           submit="submit"),
                                 follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # Check changes are reflected in database
        q = self.session.query(models.Question).get(2)
        self.assertEqual(q, None)
