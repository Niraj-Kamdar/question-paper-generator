from flaskapp import models

from test.main.test_database import DatabaseTestCase


class AddCourseTestCase(DatabaseTestCase):
    def test_add_course(self):
        new_course = dict(course="maths", submit="submit")
        response = self.app.post("/course/new", data=new_course, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        q = self.db.session.query(models.Course).first()

        self.assertEqual(str(q), 'Course(maths)')

