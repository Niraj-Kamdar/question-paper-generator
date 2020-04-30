from flask import render_template, Blueprint, url_for
from flask_login import login_required, current_user

papers = Blueprint("papers", __name__)


@papers.route("/home")
@login_required
def home():
    """Render Home page 
    
    Returns:
        HTML -- It will render home page.
    """
    image_file = url_for("static", filename="profile_pics/" + current_user.image_file)
    return render_template(
        "papers/home.html",
        css_file="css/base.css",
        css_file2="css/home.css",
        title="Home",
        image_file=image_file,
        profile_pic="profile_pics/" + current_user.image_file,
    )
