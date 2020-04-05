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
