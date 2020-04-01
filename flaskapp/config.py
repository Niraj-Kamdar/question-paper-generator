import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('EMAIL_USER')
    MAIL_PASSWORD = os.environ.get('EMAIL_PASS')


class DevelopmentConfig(Config):
    SECRET_KEY = '166839997171300f4a1f899733c043e20d1758d3595ff0c8'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    DEBUG = True


class TestingConfig(Config):
    SECRET_KEY = '166839997171300f4a1f899733c043e20d1758d3595ff0c8'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
    TESTING = True
    WTF_CSRF_ENABLED = False
