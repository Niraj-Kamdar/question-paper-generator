from flaskapp import models
from test.main.base_classes import BaseUnit
from test.main.utils import test_post_request


class AddQuestionTestCase(BaseUnit):
    def test_add_sub_question(self):
        # Test valid data
        new_question = dict(
            question="Is it okay?",
            mark=8,
            difficulty="easy",
            cognitive_level="application",
            imp=True,
            submit="submit",
        )
        _, question = test_post_request(
            self, "/course/1/unit/1/question/sub/new/", new_question, models.Question, 1
        )

        # Testing if repr method is working
        self.assertEqual(
            str(question),
            "Question(Is it okay?, 8, DifficultyEnum.Easy, CognitiveEnum.Application, True)",
        )

        # Test invalid data
        new_question = dict(
            question="Isn't it okay?",
            mark=None,
            imp=False,
            difficulty="easy",
            cognitive_level="application",
            submit="submit",
        )

        self.assertRaises(
            AttributeError,
            test_post_request,
            self,
            "/course/1/unit/1/question/sub/new/",
            new_question,
            models.Question,
            2,
        )

    def test_add_mcq_question(self):
        # test valid data
        new_mcq = dict(
            question="Rate it",
            mark=8,
            difficulty="easy",
            cognitive_level="application",
            imp=None,
            option1="10",
            option2="9",
            option3="8",
            option4="7",
        )
        _, mcq = test_post_request(
            self, "/course/1/unit/1/question/mcq/new/", new_mcq, models.MCQQuestion, 1
        )
        # test repr method
        self.assertEqual(
            str(mcq),
            "MCQQuestion(Rate it, 8, DifficultyEnum.Easy, CognitiveEnum.Application, False, 10, 9, 8, 7)",
        )
        # test invalid data
        new_mcq = dict(
            question=None,
            mark=8,
            difficulty="easy",
            cognitive_level="application",
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
            models.MCQQuestion,
            2,
        )
