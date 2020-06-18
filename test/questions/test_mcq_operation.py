from flask import json

from flaskapp import models
from test.main.base_classes import BaseMCQQuestion
from test.main.utils import test_post_request


class MCQOperationTestCase(BaseMCQQuestion):
    def test_delete_mcq(self):
        delete_list = [1, 3, 5]
        self.client.post("/course/1/unit/1/question/mcq/delete/",
                         data=json.dumps(delete_list),
                         headers={'Content-Type': 'application/json'})
        # check changes are reflected in database
        q1 = self.db.session.query(models.Question).get(1)
        q3 = self.db.session.query(models.Question).get(3)
        q5 = self.db.session.query(models.Question).get(5)
        self.assertIsNone(q1)
        self.assertIsNone(q3)
        self.assertIsNone(q5)

    def test_imp_question(self):
        # Actual set imp get request.
        imp_dict = dict(imp=[1, 3], notimp=[2])
        self.client.post("/course/1/unit/1/question/mcq/imp/",
                         data=json.dumps(imp_dict),
                         headers={'Content-Type': 'application/json'})
        # check changes are reflected in database
        q1 = self.db.session.query(models.Question).get(1)
        q2 = self.db.session.query(models.Question).get(2)
        q3 = self.db.session.query(models.Question).get(3)
        self.assertEqual(q1.imp, True)
        self.assertEqual(q2.imp, False)
        self.assertEqual(q3.imp, True)

    def test_update_question(self):
        # test valid data
        update_question = dict(
            question="moon is ...?",
            mark=8,
            difficulty="Easy",
            cognitive_level="Application",
            imp=None,
            submit="submit",
            option1="Planet",
            option2="Satellite",
            option3="meteor",
            option4="star",
        )
        test_post_request(
            self,
            "/course/1/unit/1/question/mcq/update/2",
            update_question,
            models.Question,
            2,
        )

        # test invalid data
        response, _ = test_post_request(
            self, "/course/1/unit/1/question/mcq/update/8", update_question)
        self.assertIn(b"Question:8 Does not exist", response.data)
