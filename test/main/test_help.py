from flaskapp import models
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class HelpTestCase(BaseUser):
    def test_help(self):
        response = self.client.get("/help")
        self.assertIn(b"Below is some frequently asked questions which may help you.", response.data)
        self.assertIn(b"We're dedicated to giving you the very best of our service.", response.data)
        self.assertIn(b"If you have any other questions or comments, please don't hesitate to contact us.", response.data)
        self.assertIn(b"Yes, you have to login to our system to use services provided by us.", response.data)
        self.assertIn(b"You can login/signup by email address and set password for your account.", response.data)
        self.assertIn(b"If you forget password then you can set new password.", response.data)
        self.assertIn(b"For setting new password click on forget password, you will get link for set new password if you can’t find in inbox then check spam folder.", response.data)
        self.assertIn(b"Maybe there are not enough question to meet your requirement (total marks or difficulty level)", response.data)
        self.assertIn(b"Maybe Too much questions are marked as ‘always include in papers’ so that total marks of", response.data)
        self.assertIn(b"marked questions will be more than required marks of question paper.", response.data)

