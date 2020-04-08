from flask import json


def compare_dict(self, dict1, dict2):
    """  To compare dictionaries   """
    common_keys = set(dict1.keys()) & set(dict2.keys())
    for key in common_keys:
        if dict1[key] is None:
            dict1[key] = False
        if dict2[key] is None:
            dict2[key] = False
        self.assertEqual(dict1[key], dict2[key])


def test_post_request(self, path, data, model=None, entry_no=None):
    """ Test if the post request is occuring or not.   """
    response = self.client.post(path, data=data, follow_redirects=True)
    self.assertEqual(response.status_code, 200)
    if entry_no and model:
        obj = self.db.session.query(model).get(entry_no)
        compare_dict(self, obj.to_dict(), data)
        return response, obj
    return response, None


def test_get_request(self, path, data):
    """ Test if the get request is occuring or not.   """
    data = json.dumps(data)
    response = self.client.get(f"{path}{data}", follow_redirects=True)
    self.assertEqual(response.status_code, 200)
    return response
