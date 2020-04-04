import json

from flaskapp import models
from test.main.base_classes import BaseSubQuestion


class IMPSetTestCase(BaseSubQuestion):

    def test_imp_question(self):
        # Actual set imp get request.
        imp_dict = dict(imp=[1, 3], notimp=[5])
        d = json.dumps(imp_dict)
        response = self.client.get(f"/course/1/question/sub/imp/{d}", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # check changes are reflected in database
        q1 = self.db.session.query(models.Question).get(1)
        q3 = self.db.session.query(models.Question).get(3)
        q5 = self.db.session.query(models.Question).get(5)
        self.assertEqual(q1.imp, True)
        self.assertEqual(q3.imp, True)
        self.assertEqual(q5.imp, False)
