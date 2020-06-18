from flaskapp import models
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class HelpTestCase(BaseUser):
    def test_help(self):
        response = self.client.get("/help")
        self.assertIn(
            b"Below is some frequently asked questions which", response.data)
        self.assertIn(
            b"dedicated to giving you the very best of our service.", response.data
        )
        self.assertIn(
            b"Yes, you have to login to our system to use", response.data)
        self.assertIn(
            b"You can login/signup by email address and set", response.data)
        self.assertIn(
            b"If you forget password then you can set new password.", response.data
        )
        self.assertIn(
            b"Maybe there are not enough question to meet your requirement",
            response.data,
        )
        self.assertIn(b"Maybe Too much questions are marked as", response.data)
        self.assertIn(
            b"marked questions will be more than required", response.data)
