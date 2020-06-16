from flaskapp import models
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class PrivacyPolicyTestCase(BaseUser):
    def test_privacy_policy(self):
        response = self.client.get("/privacy-policy")
        self.assertIn(b"Your privacy is important to us.", response.data)
        self.assertIn(b"We only ask for personal information when we truly need it to provide a service to you.", response.data)
        self.assertIn(b"We only retain collected information for as long as necessary to provide you with your requested service.", response.data)
        self.assertIn(b"This policy is effective as of 9 April 2020.", response.data)
        self.assertIn(b"We don’t share any personally identifying information publicly or with third-parties, except when required to by law.", response.data)
        self.assertIn(b"Our website may link to external sites that are not operated by us.", response.data)
        self.assertIn(b"What data we store, we’ll protect within commercially acceptable means", response.data)
        self.assertIn(b"to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.", response.data)
        self.assertIn(b"Your continued use of our website will be regarded as acceptance of our", response.data)
        self.assertIn(b"practices around privacy and personal information. If you have any questions about", response.data)
        self.assertIn(b"how we handle user data and personal information, feel free to contact us.", response.data)

