from flask import Blueprint, render_template, url_for
from flask_login import current_user, login_required

papers = Blueprint("papers", __name__)


@papers.route("/home")
@login_required
def home():
    """Render Home page

    Returns:
        HTML -- It will render home page.
    """
    image_file = url_for("static",
                         filename="profile_pics/" + current_user.image_file)
    return render_template(
            "papers/home.html",
            css_file="css/base.css",
            css_file2="css/home.css",
            title="Home",
            image_file=image_file,
            profile_pic="profile_pics/" + current_user.image_file,
    )
