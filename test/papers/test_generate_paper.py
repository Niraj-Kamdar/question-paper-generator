from flask import json
from test.main.utils import test_post_request
from test.main.base_classes import BaseSubQuestion
from test.main.utils import test_post_request

class paperGenerateRequest(BaseSubQuestion):
    def test_paper_generate_request(self):
        data = dict(questions=5, total_marks=25)
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
        return response.data

    def test_generate_paper(self):
        
        res = self.test_paper_generate_request()
        self.assertEqual(res,"")
        '''data = {
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
        )'''


