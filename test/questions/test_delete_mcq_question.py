import json

from flaskapp import models
from test.main.base_classes import BaseMCQQuestion


class DeleteMCQTestCase(BaseMCQQuestion):

    def test_delete_mcq(self):
        delete_list = [1, 3, 5]
        d = json.dumps(delete_list)
        response = self.client.get(f"/course/1/question/mcq/delete/{d}", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # check changes are reflected in database
        q1 = self.db.session.query(models.MCQQuestion).get(1)
        q3 = self.db.session.query(models.MCQQuestion).get(3)
        q5 = self.db.session.query(models.MCQQuestion).get(5)
        self.assertIsNone(q1)
        self.assertIsNone(q3)
        self.assertIsNone(q5)
