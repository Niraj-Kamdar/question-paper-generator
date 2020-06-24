import json

from flaskapp import models
from test.main.base_classes import BaseCourse
from test.main.utils import test_post_request


class CourseUnitTestCase(BaseCourse):
    def test_delete_unit(self):

        # Add new unit to course maths
        new_unit = dict(chapter_no=1, name="Permutations")
        _, res = test_post_request(self, "/course/1/unit/new", new_unit, models.Unit, 1)
        # Test repr method
        self.assertEqual(str(res), "Unit((1, 'Permutations'))")

        # Add second unit
        new_unit = dict(chapter_no=2, name="Combition")
        _, res = test_post_request(self, "/course/1/unit/new", new_unit, models.Unit, 2)
        # Test repr method
        self.assertEqual(str(res), "Unit((2, 'Combition'))")

        # Delete Unit
        delete_list = [2]
        self.client.post(
            "/course/1/unit/delete/",
            data=json.dumps(delete_list),
            headers={"Content-Type": "application/json"},
        )
        c1 = self.db.session.query(models.Unit).get(1)
        c2 = self.db.session.query(models.Unit).get(2)
        self.assertEqual(str(c1), "Unit((1, 'Permutations'))")
        self.assertIsNone(c2)
