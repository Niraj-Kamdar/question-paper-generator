import json

from flaskapp import models
from test.test_question import QuestionTestCase


class DeleteMCQTestCase(QuestionTestCase):

    def test_delete_mcq(self):
        # Test valid data
        # populate database with new questions.
        response1 = self.app.post("/question/mcq/new/",
                                  data=dict(question="Rate it", mark=8,
                                            difficulty=10, imp=None, submit="submit", option1='10', option2='9',
                                            option3='8', option4='7'),
                                  follow_redirects=True)
        self.assertEqual(response1.status_code, 200)

        response2 = self.app.post("/question/mcq/new/",
                                  data=dict(question="Watch", mark=8,
                                            difficulty=10, imp=None, submit="submit", option1='A', option2='B',
                                            option3='C', option4='D'),
                                  follow_redirects=True)
        self.assertEqual(response2.status_code, 200)

        response3 = self.app.post("/question/mcq/new/",
                                  data=dict(question="New novel", mark=8,
                                            difficulty=10, imp=None, submit="submit", option1='H', option2='G',
                                            option3='V', option4='O'),
                                  follow_redirects=True)
        self.assertEqual(response3.status_code, 200)

        # Actual delete question get request.
        delete_list = [1, 3]
        d = json.dumps(delete_list)
        response = self.app.get(f"/question/mcq/delete/{d}", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # check changes are reflected in database
        q1 = self.session.query(models.MCQQuestion).get(1)
        q2 = self.session.query(models.MCQQuestion).get(2)
        q3 = self.session.query(models.MCQQuestion).get(3)
        self.assertEqual(q1, None)
        self.assertEqual(str(q2), "MCQQuestion(Watch, 8, 10, False, A, B, C, D)")
        self.assertEqual(q3, None)