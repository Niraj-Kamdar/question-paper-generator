from flaskapp import models
from test.main.base_classes import BaseCourse
from test.main.utils import test_post_request


class AddQuestionTestCase(BaseCourse):

    def test_add_question(self):
        # Test valid data
        new_question = dict(question="Is it okay?", mark=8, difficulty=10, imp=True, submit="submit")
        _, question = test_post_request(self, "/course/1/question/sub/new/", new_question, models.Question, 1)

        # Testing if repr method is working
        self.assertEqual(str(question), "Question(Is it okay?, 8, 10, True)")

        # Test invalid data
        new_question = dict(question="Isn't it okay?", mark=None, difficulty="1", imp=False, submit="submit")

        self.assertRaises(AttributeError,
                          test_post_request,
                          self, "/course/1/question/sub/new/", new_question, models.Question, 2)
