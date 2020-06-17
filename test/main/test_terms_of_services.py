from flaskapp import models
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class TermsOfServiceTestCase(BaseUser):
    def test_terms_of_service(self):
        response = self.client.get("/terms-of-service")
        self.assertIn(
            b"you are agreeing to be bound by these terms of", response.data)
        self.assertIn(
            b"responsible for compliance with any applicable local laws.", response.data)
        self.assertIn(
            b"The materials contained in this website are protected", response.data)
        self.assertIn(
            b"by applicable copyright and trademark law.", response.data)
        self.assertIn(
            b"Permission is hereby granted, free of charge,", response.data)
        self.assertIn(b"a copy of this software and associated", response.data)
        self.assertIn(
            b"The above copyright notice and this permission", response.data)
        self.assertIn(
            b"be included in all copies or substantial portion", response.data)
        self.assertIn(
            b"This license shall automatically terminate if you", response.data)
        self.assertIn(
            b"any of these restrictions and may be terminated by", response.data)
        self.assertIn(
            b"all other warranties including, without limitation,", response.data)
        self.assertIn(
            b"warranties or conditions of merchantability, fitnes", response.data)
        self.assertIn(
            b"or non-infringement of intellectual property or other", response.data)
        self.assertIn(
            b"of the materials on its website or otherwise", response.data)
        self.assertIn(
            b"no event shall SetNow or its suppliers be", response.data)
        self.assertIn(
            b"including, without limitation, damages for loss of data", response.data)
        self.assertIn(
            b"However SetNow does not make any commitment to", response.data)
        self.assertIn(
            b"SetNow has not reviewed all of the sites linked to its", response.data)
        self.assertIn(
            b"linked site. The inclusion of any link does not imply", response.data)
        self.assertIn(
            b"SetNow may revise these terms of service for its website", response.data)
        self.assertIn(
            b"By using this website you are agreeing to be bound by the then", response.data)
        self.assertIn(
            b"These terms and conditions are governed by and construed in", response.data)
        self.assertIn(
            b"and you irrevocably submit to the exclusive jurisdiction of", response.data)
        self.assertIn(b"Terms Of Service", response.data)
