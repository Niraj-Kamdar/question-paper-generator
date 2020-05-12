from flaskapp import models
from test.main.base_classes import BaseSubQuestion
from test.main.utils import test_get_request
from test.main.utils import test_post_request


class SubOperationTestCase(BaseSubQuestion):
    def test_update_question(self):
        # test valid data
        update_question = dict(
            question="How many prime numbers between 1 to 100?",
            mark=5,
            difficulty="easy",
            cognitive_level="knowledge",
            imp=True,
            submit="submit",
        )
        test_post_request(
            self,
            "/course/1/unit/1/question/sub/update/2",
            update_question,
            models.Question,
            2,
        )

        # test invalid data
        response, _ = test_post_request(
            self, "/course/1/unit/1/question/sub/update/12", update_question)
        self.assertIn(b"Question:12 Does not exist", response.data)

    def test_delete_question(self):
        delete_list = [1, 4]
        test_get_request(self, "/course/1/unit/1/question/sub/delete/",
                         delete_list)

        # check changes are reflected in database
        q1 = self.db.session.query(models.Question).get(1)
        q4 = self.db.session.query(models.Question).get(4)
        self.assertIsNone(q1)
        self.assertIsNone(q4)

    def test_imp_question(self):
        # Actual set imp get request.
        imp_dict = dict(imp=[1, 3], notimp=[5])
        test_get_request(self, "/course/1/unit/1/question/sub/imp/", imp_dict)

        # check changes are reflected in database
        q1 = self.db.session.query(models.Question).get(1)
        q3 = self.db.session.query(models.Question).get(3)
        q5 = self.db.session.query(models.Question).get(5)
        self.assertEqual(q1.imp, True)
        self.assertEqual(q3.imp, True)
        self.assertEqual(q5.imp, False)
