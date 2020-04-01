from flaskapp import models
from test.main.test_database import DatabaseTestCase


class RegisterUserTestCase(DatabaseTestCase):
    def test_register_user(self):
        new_user = dict(username="pr.proton", email="proton@gmail.com", password="proton@101",
                        confirm_password="proton@101", submit="Sign Up")
        response = self.app.post("/register", data=new_user, follow_redirects=True)
        self.assertEqual(response.status_code, 200)

        q = self.db.session.query(models.User).first()

        self.assertEqual(str(q), 'User(pr.proton, proton@gmail.com, default.jpg)')
