from PIL import Image
from flaskapp import models
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class UserAccountTestCase(BaseUser):
    def test_set_profile(self):
        self.login()
        im1 = Image.open("profile1.png")
        set_user = dict(username="nr.nutron", email="nutron@gmail.com",
                         picture=im1, submit="submit")
        test_post_request(self, "/account", set_user, models.User, 1)

    def test_update_profile(self):
        self.login()
        # first set profile
        im1 = Image.open("profile1.png")
        set_user = dict(username="nr.nutron", email="nutron@gmail.com",
                         picture=im1, submit="submit")
        test_post_request(self, "/account", set_user, models.User, 1)

        # update with new
        im2 = Image.open("profile2.png")
        set_user = dict(username="nr.nutron", email="nutron@gmail.com",
                         picture=im2, submit="submit")
        test_post_request(self, "/account", set_user, models.User, 1)
