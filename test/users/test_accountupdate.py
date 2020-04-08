from test.main.base_classes import BaseUser, BaseDatabase
from test.main.utils import test_post_request, compare_dict
from flaskapp import models

class accountUpdate(BaseUser):
    def test_update_usernameEmail(self):
        self.login()
        update_user = dict(username="nr.nutron", email="nutron@gmail.com", submit="submit")
        test_post_request(self, "/account", update_user, models.User, 1)

class conflictTest(BaseDatabase):
    def test_conflict_username(self):  
        BaseDatabase.setUp(self)
        self.client = self.app.test_client()            
        new_user1 = dict(username="pr.proton", email="proton@gmail.com", password="proton@101",
                        confirm_password="proton@101", submit="Sign Up")
        test_post_request(self, "/register", new_user1, models.User, 1)

        new_user2 = dict(username="nr.nutron", email="nutron@gmail.com", password="nutron@101",
                        confirm_password="nutron@101", submit="Sign Up")
        test_post_request(self, "/register", new_user2, models.User, 2)

        user = dict(email="proton@gmail.com", password="proton@101",
                                         remember=True, submit="Login")
        test_post_request(self, "/login", user)

        update_user1 = dict(username="nr.nutron", email="proton@gmail.com", submit="submit")
        test_post_request(self, "/account", update_user1)
        obj = self.db.session.query(models.User).get(1).to_dict()
        compare_dict(self, new_user1, obj)
