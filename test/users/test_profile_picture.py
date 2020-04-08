from PIL import Image
import os
from test.main.base_classes import BaseUser
from test import TEST_PATH


class UserAccountTestCase(BaseUser):
    def test_profile(self):
        self.login()
        url = '/account'
        im1 = os.path.join(TEST_PATH, "users", "profile1.png")
        picture = Image.open(im1)
        self.client.post(url, picture = picture)
