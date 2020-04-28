from flask import Blueprint
from flask import render_template
from flask import url_for
from flask_login import current_user
from flask_login import login_required

from flaskapp.utils import profile_path

papers = Blueprint("papers", __name__)


@papers.route("/home")
@login_required
def home():
    """Render Home page

    Returns:
        HTML -- It will render home page.
    """
    return render_template(
        "papers/home.html",
        css_file="css/base.css",
        css_file2="css/home.css",
        title="Home",
        image_file=profile_path(),
        profile_pic="profile_pics/" + current_user.image_file,
    )
