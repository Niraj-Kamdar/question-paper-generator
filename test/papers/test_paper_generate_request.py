from test.main.base_classes import BaseUnit
from test.main.utils import test_post_request

from flask import json
from flaskapp.utils import json_url


class PaperGenerateRequest(BaseUnit):
    def test_paper_generate_request(self):
        data = dict(questions=json.dumps([1, 2, 3]), total_marks=30)
        response = self.client.post(
            "/course/1/papers/generate/request",
            data=json.dumps(data),
            headers={"Content-Type": "application/json"},
        )
        print(response.data.decode())
        # FIXME: assert something here: response.data

    def test_mark_distribution_form(self):
        self.test_paper_generate_request()
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
            "sub": 15,
            "mcq": 15,
        }
        response, _ = test_post_request(self, f"/course/1/papers/generate/form/", data)
        print(response.data.decode().split("title")[1])
        response = self.client.post(
            "/course/1/papers/confirm/template/",
            data=json.dumps(dict(status="OK")),
            headers={"Content-Type": "application/json"},
        )
        print(response.data)
        # FIXME: do some assertion here
        # {'Unit:01': '30', 'Knowledge': '10', 'Comprehension': '10', 'Application': '10', 'Easy': '10', 'Medium': '10', 'Hard': '10', 'Que.1.A': '5', 'Que.2.A': '5', 'Que.2.B': '5', 'Que.3.A': '5', 'Que.3.B': '5', 'Que.3.C': '5', 'sub': '15', 'mcq': '15'}
