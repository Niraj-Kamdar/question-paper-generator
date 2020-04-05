import json

from flaskapp import models
from test.main.base_classes import BaseMCQQuestion


class IMPMCQTestCase(BaseMCQQuestion):

    def test_imp_question(self):
        # Actual set imp get request.
        imp_dict = dict(imp=[1, 3], notimp=[2])
        d = json.dumps(imp_dict)
        response = self.client.get(f"/course/1/question/mcq/imp/{d}", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # check changes are reflected in database
        q1 = self.db.session.query(models.MCQQuestion).get(1)
        q2 = self.db.session.query(models.MCQQuestion).get(2)
        q3 = self.db.session.query(models.MCQQuestion).get(3)
        self.assertEqual(q1.imp, True)
        self.assertEqual(q2.imp, False)
        self.assertEqual(q3.imp, True)
