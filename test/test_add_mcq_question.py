from flaskapp import models

from test.test_question import QuestionTestCase


class MCQTestCase(QuestionTestCase):

    def test_mcq_add(self):
        response1 = self.app.post("/question/mcq/new",
                                  data=dict(question="Rate it", mark=8,
                                            difficulty=10, imp=None, submit="submit", option1='10', option2='9',
                                            option3='8', option4='7'),
                                  follow_redirects=True)
        self.assertEqual(response1.status_code, 200)
        q1 = self.session.query(models.MCQQuestion).get(1)
        self.assertEqual(str(q1), "MCQQuestion(Rate it, 8, 10, False, 10, 9, 8, 7)")

        new_question = dict(question="Choose One", mark=8, difficulty=10, imp=True, submit="submit", option1='A',
                            option2='B', option3='C', option4='D')
        response = self.app.post("/question/mcq/new",
                                 data=new_question,
                                 follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        q = self.session.query(models.MCQQuestion).get(2)

        # Testing if repr method is working
        self.assertEqual(str(q), "MCQQuestion(Choose One, 8, 10, True, A, B, C, D)")

        # DO appropriate changes in new_question to match database result
        del new_question["submit"]
        new_question["id"] = 2
        self.assertEqual(q.to_dict(), new_question)
