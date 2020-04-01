from flaskapp import models


def compare_dict(self, dict1, dict2):
    common_keys = set(dict1.keys()) & set(dict2.keys())
    for key in common_keys:
        self.assertEqual(dict1[key], dict2[key])


def test_post_request(self, path, data, entry_no=None):
    response = self.app.post(path, data=data, follow_redirects=True)
    self.assertEqual(response.status_code, 200)
    if entry_no:
        obj = self.db.session.query(models.User).get(entry_no)
        try:
            compare_dict(self, obj.to_dict(), data)
            return response, obj
        except AttributeError:
            return response, False
    return response, None
