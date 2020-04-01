import json

from flaskapp import models
from test.main.test_database import DatabaseTestCase


class IMPSetTestCase(DatabaseTestCase):

    def test_imp_question(self):
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

        # Actual set imp get request.
        imp_dict = dict(imp=[1, 2], notimp=[3])
        d = json.dumps(imp_dict)
        response = self.app.get(f"/question/sub/imp/{d}", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # check changes are reflected in database
        q1 = self.session.query(models.Question).first()
        q2 = self.session.query(models.Question).get(2)
        q3 = self.session.query(models.Question).get(3)
        self.assertEqual(q1.imp, True)
        self.assertEqual(q2.imp, True)
        self.assertEqual(q3.imp, False)
