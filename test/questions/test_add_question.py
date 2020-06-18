from flaskapp.models import Question
from test.main.base_classes import BaseUnit
from test.main.utils import test_post_request


class AddQuestionTestCase(BaseUnit):
    def test_add_sub_question(self):
        # Test valid data
        new_question = dict(
                question="Is it okay?",
                mark=8,
                difficulty="Easy",
                cognitive_level="Application",
                imp=True,
                submit="submit",
        )
        _, question = test_post_request(self,
                                        "/course/1/unit/1/question/sub/new/",
                                        new_question, Question, 1)

        # Testing if repr method is working
        self.assertEqual(
                str(question),
                "Question(Is it okay?, 8, Easy, Application, sub, True)",
        )

        # Test invalid data
        new_question = dict(
                question="Isn't it okay?",
                mark=None,
                imp=False,
                difficulty="Easy",
                cognitive_level="Application",
                submit="submit",
        )

        self.assertRaises(
                AttributeError,
                test_post_request,
                self,
                "/course/1/unit/1/question/sub/new/",
                new_question,
                Question,
                2
        )

    def test_add_mcq_question(self):
        # test valid data
        new_mcq = dict(
                question="Rate it",
                mark=8,
                difficulty="Easy",
                cognitive_level="Application",
                imp=None,
                option1="10",
                option2="9",
                option3="8",
                option4="7",
        )
        _, mcq = test_post_request(self, "/course/1/unit/1/question/mcq/new/",new_mcq,Question, 1)
        # test repr method
        self.assertEqual(
                str(mcq),
                "Question(Rate it, 8, Easy, Application, mcq, False)",
        )
        # test invalid data
        new_mcq = dict(
                question=None,
                mark=8,
                difficulty="Easy",
                cognitive_level="Application",
                imp=True,
                submit="submit",
                option1="A",
                option2="B",
                option3="C",
                option4="D",
        )

        self.assertRaises(
                AttributeError,
                test_post_request,
                self,
                "/course/1/unit/1/question/mcq/new/",
                new_mcq,
                Question,
                2
        )
