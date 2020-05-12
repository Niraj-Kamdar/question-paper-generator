from flask import json
from flaskapp.utils import CognitiveLevel, DifficultyLevel


def compare_dict(self, dict1, dict2):
    """Compare to objects

    Arguments:
        dict1 {Object(list/tuple)} -- list/tuple
        dict2 {Object(list/tuple)} -- list/tuple
    """
    common_keys = set(dict1.keys()) & set(dict2.keys())
    for key in common_keys:
        try:
            dict2[key] = DifficultyLevel(dict2[key])
        except KeyError:
            pass
        try:
            dict2[key] = CognitiveLevel(dict2[key])
        except KeyError:
            pass
        if dict2[key] is None:
            dict2[key] = False
        self.assertEqual(dict1[key], dict2[key])


def test_post_request(self, path, data, model=None, entry_no=None):
    """Testing post request

    Returns:
        Response of test/None -- It will test if the post request is occuring or not.
    """
    response = self.client.post(path, data=data, follow_redirects=True)
    self.assertEqual(response.status_code, 200)
    if entry_no and model:
        obj = self.db.session.query(model).get(entry_no)
        compare_dict(self, obj.to_dict(), data)
        return response, obj
    return response, None


def test_get_request(self, path, data):
    """Testing get request

    Returns:
        Response of test -- It will test if the get request is occuring or not.
    """
    data = json.dumps(data)
    response = self.client.get(f"{path}{data}", follow_redirects=True)
    self.assertEqual(response.status_code, 200)
    return response
