import os

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_caching import Cache
from flask_login import LoginManager
from flask_mail import Mail
from flask_minify import minify
from flask_sqlalchemy import SQLAlchemy

from flaskapp.config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = "users.login"
login_manager.login_message_category = "info"
mail = Mail()
cache = Cache()
APP_PATH = os.path.dirname(os.path.abspath(__file__))
TEST_DB = "test.db"


def create_app(config_class=Config):
    """To create

    Keyword Arguments:
        config_class {object} -- It configures app (default: {Config})

    Returns:
        App -- it creates app using configuration from config_class
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)
    cache.init_app(app)
    minify(app=app, html=True, js=True, cssless=True)

    from flaskapp.blueprints.users.routes import users
    from flaskapp.blueprints.questions.routes import questions
    from flaskapp.blueprints.main.routes import main
    from flaskapp.blueprints.errors.routes import errors
    from flaskapp.blueprints.papers.routes import papers

    app.register_blueprint(users)
    app.register_blueprint(questions)
    app.register_blueprint(main)
    app.register_blueprint(errors)
    app.register_blueprint(papers)

    return app
