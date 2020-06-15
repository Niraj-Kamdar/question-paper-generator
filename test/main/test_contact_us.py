from flaskapp import models
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class WebpageTestCase(BaseUser):
    def test_contact_us(self):
        with self.mail.record_messages() as outbox:
            data = dict(
                name="Tester",
                email="proton@gmail.com",
                mobile="123456789",
                subject="Test01",
                message="This is test mail",
            )
            response, _ = test_post_request(self, "/contact-us", data)
            self.assertIn(b"Get in touch", response.data)
            self.assertEqual(2, len(outbox))
            self.assertEqual("[SetNow Support] Re: Test01", outbox[1].subject)
            self.assertEqual("Test01", outbox[0].subject)
            self.assertEqual("setnow@tuta.io", outbox[1].sender)
            self.assertEqual("proton@gmail.com", outbox[1].recipients[0])
            self.assertIn("This is test mail", outbox[0].html)
