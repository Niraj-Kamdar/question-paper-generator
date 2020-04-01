from flaskapp.main.utils import test_post_request
from test.main.test_database import DatabaseTestCase


class UserTestCase(DatabaseTestCase):
    def test_register_user(self):
        new_user = dict(username="pr.proton", email="proton@gmail.com", password="proton@101",
                        confirm_password="proton@101", submit="Sign Up")
        test_post_request(self, "/register", new_user, 1)

    def test_login_user(self):
        user = dict(email="proton@gmail.com", password="proton@101")
        response, obj = test_post_request(self, "/login", user)
        # fixme: check if response.content is home page.
