from flask import render_template, Blueprint, redirect, url_for
from flask_login import current_user

main = Blueprint('main', __name__)


@main.route("/")
def index():
    if current_user.is_authenticated:
        return redirect(url_for('papers.home'))
    return render_template("main/index.html", title='Index', css_file='css/index.css', js_file='js/index.js',
                           js_file2='js/login.js')


@main.route("/about")
def about():
    return render_template('main/about.html', title='About')
