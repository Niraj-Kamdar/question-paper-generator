from flaskapp import models
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class TermsOfServiceTestCase(BaseUser):
    def test_terms_of_service(self):
        response = self.client.get("/terms-of-service")
        self.assertIn(b"you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.", response.data)
        self.assertIn(b"The materials contained in this website are protected by applicable copyright and trademark law.", response.data)
        self.assertIn(b"Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files", response.data)
        self.assertIn(b"The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.", response.data)
        self.assertIn(b"This license shall automatically terminate if you violate any of these restrictions and may be terminated by SetNow at any time.", response.data)
        self.assertIn(b"all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.", response.data)
        self.assertIn(b"of the materials on its website or otherwise relating to such materials or on any sites linked to this site. ", response.data)
        self.assertIn(b"no event shall SetNow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption)", response.data)
        self.assertIn(b"The materials appearing on SetNow's website could include technical, typographical, or photographic errors. SetNow does not warrant that any of the materials on its website are accurate, complete or current.", response.data)
        self.assertIn(b"However SetNow does not make any commitment to update the materials.", response.data)
        self.assertIn(b"SetNow has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SetNow of the site.", response.data)
        self.assertIn(b"SetNow may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.", response.data)
        self.assertIn(b"These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.", response.data)
        self.assertIn(b"Terms Of Service", response.data)

