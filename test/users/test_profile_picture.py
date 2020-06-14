import os

from flaskapp import APP_PATH
from flaskapp import models
from test import TEST_PATH
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class UserAccountTestCase(BaseUser):
    def test_profile(self):
        self.login()
        image_file = os.path.join(TEST_PATH, "users", "profile1.png")
        with open(image_file, "rb") as image:
            data = dict(
                username="nr.nutron",
                email="proton@gmail.com",
                picture=image,
                submit="submit",
            )
            test_post_request(self, "/account", data, models.User, 1)

        with self.client.get("/static/profile_pics/1.png") as response:
            self.assertGreater(len(response.data), 1)

        remove_profile = os.path.join(
            APP_PATH, "static", "profile_pics", "1.png")
        os.remove(remove_profile)
