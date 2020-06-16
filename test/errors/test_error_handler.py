from test.main.base_classes import BaseCourse


class ErrorHandlerTestCase(BaseCourse):
    def test_404_error(self):
        # path not exists
        response = self.client.get("/garbage")
        self.assertEqual(404, response.status_code)
        self.assertIn(b"<title>404</title>", response.data)

        # test question type that does not exist
        response = self.client.get("/course/1/question/oops/new",
                                   follow_redirects=True)
        self.assertEqual(404, response.status_code)
        self.assertIn(b"<title>404</title>", response.data)

    def test_403_error(self):
        response = self.client.get("/course/2/unit/1/question/sub/new",
                                   follow_redirects=True)
        self.assertEqual(403, response.status_code)
        self.assertIn(b"<title>403</title>", response.data)
