import os
from test.main.base_classes import BaseUser
from test import TEST_PATH


class UserAccountTestCase(BaseUser):
    def test_profile(self):
        self.login()
        url = '/account'
        im1 = os.path.join(TEST_PATH, "users", "profile1.png")
        files = {'picture': open(im1, 'rb')}
        self.client.post(url, files=files)