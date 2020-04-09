from flask import render_template, Blueprint
from flask_login import login_required, current_user

papers = Blueprint('papers', __name__)


@papers.route('/home')
@login_required
def home():
    """Render Home page 
    
    Returns:
        page -- It will render home page.
    """
    return render_template("papers/home.html",
                           css_file='css/home.css',
                           js_file='js/home.js',
                           title='Home',
                           profile_pic="profile_pics/" + current_user.image_file)
