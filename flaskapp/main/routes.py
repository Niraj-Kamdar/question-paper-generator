from random import randint

from flask import render_template, Blueprint

main = Blueprint('main', __name__)


@main.route("/")
def index():
    colors = [["#007991", "#00bfe6"], ["#642B73", "#C6426E"], ["#444444", "#777777"]]
    opacity = "b3"
    random_num = randint(0, len(colors) - 1)
    return render_template("index.html", color=colors[random_num], opacity=opacity, title='Index')


@main.route("/about")
def about():
    return render_template('about.html', title='About')
