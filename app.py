import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

from flaskapp import create_app
from flaskapp.config import DevelopmentConfig

sentry_sdk.init(
    dsn=
    "https://1fdf413ccfcc4a249f79519bfc269965@o374456.ingest.sentry.io/5192531",
    integrations=[FlaskIntegration()],
)

app = create_app(config_class=DevelopmentConfig)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers["X-UA-Compatible"] = "IE=Edge,chrome=1"
    return response


if __name__ == "__main__":
    app.run("0.0.0.0", 80)
