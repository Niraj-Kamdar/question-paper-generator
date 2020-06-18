from flask import json

from flaskapp.utils import json_url
from test.main.base_classes import BaseUnit
from test.main.utils import test_post_request


class PaperGenerateRequest(BaseUnit):
    def test_paper_generate_request(self):
        data = dict(questions=json.dumps([1, 2, 3]), total_marks=10)
        response = self.client.post("/course/1/papers/generate/request",
                                    data=json.dumps(data),
                                    headers={'Content-Type': 'application/json'})
        # FIXME: assert something here: response.data

    def test_mark_distribution_form(self):
        questions = [1, 2, 3]
        data = {
            "Unit:01": "30",
            "Knowledge": "10",
            "Comprehension": "10",
            "Application": "10",
            "Easy": "10",
            "Medium": "10",
            "Hard": "10",
            "Que.1.A": "5",
            "Que.2.A": "5",
            "Que.2.B": "5",
            "Que.3.A": "5",
            "Que.3.B": "5",
            "Que.3.C": "5",
        }

        token = json_url.dumps(dict(questions=questions, total_marks=30))
        response, _ = test_post_request(
                self, f"/course/1/papers/generate/form/{token}", data)
        # FIXME: do some assertion here
