from flaskapp import models

from test.main.base_classes import BaseCourse
from test.main.utils import test_post_request


class MCQTestCase(BaseCourse):

    def test_mcq_add(self):
        # test valid data
        new_mcq = dict(question="Rate it", mark=8, difficulty=10, imp=None,
                       option1='10', option2='9', option3='8', option4='7')
        _, mcq = test_post_request(self, "/course/1/question/mcq/new/", new_mcq, models.MCQQuestion, 1)
        # test repr method
        self.assertEqual(str(mcq), "MCQQuestion(Rate it, 8, 10, False, 10, 9, 8, 7)")
        # test invalid data
        new_mcq = dict(question=None, mark=8, difficulty=10, imp=True, submit="submit",
                       option1='A', option2='B', option3='C', option4='D')

        self.assertRaises(AttributeError,
                          test_post_request,
                          self, "/course/1/question/mcq/new/", new_mcq, models.MCQQuestion, 2)
