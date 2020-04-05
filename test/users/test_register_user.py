from bs4 import BeautifulSoup

from test.main.base_classes import BaseUser


class LoginUserTestCase(BaseUser):

    def test_login_user(self):
        self.login()
        response = self.client.get("/home")
        soup = BeautifulSoup(response.data, 'lxml')
        title = soup.find(id="home_title")
        self.assertEqual(title.contents[0], 'Recent')

    def test_logout_user(self):
        self.login()
        self.logout()
        response = self.client.get("/home")
        soup = BeautifulSoup(response.data, 'lxml')
        title = soup.find(id="home_title")
        self.assertEqual(title, None)


