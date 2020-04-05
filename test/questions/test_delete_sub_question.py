import json

from flaskapp import models
from test.main.base_classes import BaseSubQuestion


class DeleteSetTestCase(BaseSubQuestion):

    def test_delete_question(self):
        delete_list = [1, 4]
        d = json.dumps(delete_list)
        response = self.client.get(f"/course/1/question/sub/delete/{d}", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        # check changes are reflected in database
        q1 = self.db.session.query(models.Question).get(1)
        q4 = self.db.session.query(models.Question).get(4)
        self.assertIsNone(q1)
        self.assertIsNone(q4)
