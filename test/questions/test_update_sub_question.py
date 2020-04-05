from flaskapp import models

from test.main.base_classes import BaseSubQuestion
from test.main.utils import test_post_request


class UpdateQuestionTestCase(BaseSubQuestion):

    def test_update_question(self):
        # test valid data
        update_question = dict(question="How many prime numbers between 1 to 100?", mark=5, difficulty=20, imp=True,
                               submit="submit")
        test_post_request(self, "/course/1/question/sub/update/2", update_question, models.Question, 2)

        # test invalid data
        response, _ = test_post_request(self, "/course/1/question/sub/update/8", update_question)
        self.assertIn(b"Question:8 Does not exist", response.data)
