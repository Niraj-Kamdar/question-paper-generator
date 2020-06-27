from flask import json

from test.main.base_classes import BaseUnit
from test.main.utils import test_post_request


class PaperGenerateRequest(BaseUnit):
    def test_paper_generate_request(self):
        data = dict(questions=[1, 2, 3], total_marks=30)
        response = self.client.post(
            "/course/1/papers/generate/request",
            data=json.dumps(data),
            headers={"Content-Type": "application/json"},
        )
        self.assertIn(
            (b"You should be redirected automatically to target URL: "
             b"<a href=/course/1/papers/generate/form/ >"),
            response.data,
        )

    def test_handle_conflicting_questions(self):
        data = dict(mcq={
            "ask": [1, 3],
            "nask": [2, 4]
        },
                    sub={
                        "ask": [1, 3],
                        "nask": [2, 4]
                    })
        response = self.client.post(
            "/papers/handle/conflicts",
            data=json.dumps(data),
            headers={"Content-Type": "application/json"},
        )
        data1 = json.loads(response.get_data(as_text=True))
        self.assertEqual(data1["status"], "OK")

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
        response, _ = test_post_request(self,
                                        "/course/1/papers/generate/form/",
                                        data)
        self.assertIn(b"<title>Mark Distribution</title>", response.data)
        response = self.client.post(
            "/course/1/papers/confirm/template/",
            data=json.dumps(dict(status="OK")),
            headers={"Content-Type": "application/json"},
        )
        self.assertIn(
            (b"You should be redirected automatically to target URL: "
             b"<a href=/course/1/papers/generate/ >"),
            response.data,
        )
