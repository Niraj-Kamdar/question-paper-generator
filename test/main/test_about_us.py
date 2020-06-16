from flaskapp import models
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class AboutUsTestCase(BaseUser):
    def test_about_us(self):
        response, _ = test_post_request(self, "/about-us", data)
        self.assertIn(b"Welcome to SetNow, We're dedicated to giving you the very best of our service.", response.data)
        self.assertIn(b"This website is created by students of DA-IICT (Gandhinagar, Gujrat).", response.data)
        self.assertIn(b"This effort was made under the guidence of Prof. Saurabh Tiwari.", response.data)
        self.assertIn(b"Our Team", response.data)
        self.assertIn(b"Niraj Kamdar [201701184]", response.data)
        self.assertIn(b"UI/UX designer", response.data)
        self.assertIn(b"Nikunj Kambariya [201701191]", response.data)
        self.assertIn(b"UI/UX designer", response.data)
        self.assertIn(b"Jaymin Parmar [201701203]", response.data)
        self.assertIn(b"Quality assurance engineer", response.data)
        self.assertIn(b"Team Back-end", response.data)

