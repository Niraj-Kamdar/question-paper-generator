import re

from bs4 import BeautifulSoup

from flaskapp import models
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class UserAccountTestCase(BaseUser):
    def test_update_account(self):
        self.login()
        update_user = dict(username="nr.nutron", email="nutron@gmail.com", submit="submit")
        test_post_request(self, "/account", update_user, models.User, 1)

    def test_conflicting_username(self):
        # add dummy user
        new_user = dict(username="nr.nutron", email="nutron@gmail.com", password="nutron@101",
                        confirm_password="nutron@101", submit="Sign Up")
        test_post_request(self, "/register", new_user, models.User, 2)

        self.login()
        # test changing current_user's username with already registered user's username
        current_user = dict(username="nr.nutron", email="proton@gmail.com", submit="submit")
        self.assertRaises(AssertionError, test_post_request, self, "/account", current_user, models.User, 1)

    def test_forgot_password(self):
        # test valid user
        with self.mail.record_messages() as outbox:
            # test with valid token
            data = dict(email="proton@gmail.com")
            response, _ = test_post_request(self, "/reset_password", data)
            self.assertIn(b"An email has been sent with instructions to reset your password.", response.data)
            self.assertEqual(1, len(outbox))
            self.assertEqual("Password Reset Request", outbox[0].subject)
            self.assertEqual("proton@gmail.com", outbox[0].recipients[0])
            regex = r"/reset_password/([^/]+) \)"
            link = re.search(regex, outbox[0].body)
            self.assertIsNotNone(link)
            token = link.group(1)

            new_password = dict(password="VeryDumb@123", confirm_password="VeryDumb@123")
            response, _ = test_post_request(self, "/reset_password/" + token, new_password)
            self.assertIn(b"Your password has been updated! You are now able to log in", response.data)

            user = dict(email="proton@gmail.com", password="VeryDumb@123", remember=True, submit="Login")
            test_post_request(self, "/login", user)

            response = self.client.get("/home")
            soup = BeautifulSoup(response.data, 'lxml')
            title = soup.find(("h1", {"class": "header"}))
            self.assertEqual(title.contents[0], 'Recent')
            self.logout()

        # test invalid token
        response, _ = test_post_request(self, "/reset_password/fakeToken", new_password)
        self.assertIn(b"<title>SetNow : Reset Password</title>", response.data)
        # FIXME: add flash in frontend: enable this test once fixed
        # self.assertIn(b"That is an invalid or expired token", response.data)
                
        # test unregistered email
        data = dict(email="doesn't@exit.com")
        response, _ = test_post_request(self, "/reset_password", data)
        self.assertIn(b"There is no account with that email. You must register first.", response.data)
