import os

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy

from flaskapp.config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'
mail = Mail()
APP_PATH = os.path.dirname(os.path.abspath(__file__))
TEST_DB = "test.db"


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

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
