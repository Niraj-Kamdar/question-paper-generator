from flaskapp import models

from test.main.base_classes import BaseMCQQuestion
from test.main.utils import test_post_request


class UpdateQuestionTestCase(BaseMCQQuestion):

    def test_update_question(self):
        # test valid data
        update_question = dict(question="moon is ...?", mark=8, difficulty=10, imp=None, submit="submit",
                               option1="Planet", option2="Satellite", option3="meteor", option4="star")
        test_post_request(self, "/course/1/question/mcq/update/2", update_question, models.MCQQuestion, 2)

        # test invalid data
        response, _ = test_post_request(self, "/course/1/question/mcq/update/8", update_question)
        self.assertIn(b"Question:8 Does not exist", response.data)
