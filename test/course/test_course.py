from flask import json

from flaskapp import models
from test.main.base_classes import BaseUser
from test.main.utils import test_post_request


class CourseTestcase(BaseUser):
    def test_delete_course(self):
        BaseUser.setUp(self)
        self.login()
        # adding new course
        new_course = dict(course="maths")
        _, course = test_post_request(self, "/course/new", new_course, models.Course, 1)
        # Checking repr method
        self.assertEqual(str(course), "Course(maths)")

        # adding another course
        new_course = dict(course="science")
        _, course = test_post_request(self, "/course/new", new_course, models.Course, 2)
        # cheking repr method
        self.assertEqual(str(course), "Course(science)")

        # Delete course
        delete_list = [1, 2]
        self.client.post(
            "/course/delete/",
            data=json.dumps(delete_list),
            headers={"Content-Type": "application/json"},
        )
        c1 = self.db.session.query(models.Course).get(1)
        c2 = self.db.session.query(models.Course).get(2)
        self.assertIsNone(c1)
        self.assertIsNone(c2)
