from flask import render_template, Blueprint

main = Blueprint('main', __name__)


@main.route("/")
def index():
    return render_template("main/index.html", title='Index', css_file='css/index.css', js_file='js/index.js')


@main.route("/about")
def about():
    return render_template('main/about.html', title='About')
