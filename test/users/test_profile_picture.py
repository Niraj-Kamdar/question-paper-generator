import os
from test.main.base_classes import BaseUser

class UserAccountTestCase(BaseUser):
    def test_profile(self):
        self.login()
        url = '/account'
        files = {'picture': open('profile1.png', 'rb')}
        self.client.post(url, files=files)