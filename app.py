# from flaskapp import create_app, config
# from flaskapp.config import DevelopmentConfig
# app = create_app(config_class=DevelopmentConfig)


# @app.after_request
# def add_header(response):
#     """
#     Add headers to both force latest IE rendering engine or Chrome Frame,
#     and also to cache the rendered page for 10 minutes.
#     """
#     response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
#     return response


# if __name__ == '__main__':
#     app.run()
from flaskapp import create_app, config

app = create_app(config_class=config.DevelopmentConfig)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


if __name__ == '__main__':
    app.run()