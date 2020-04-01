from flaskapp import create_app, config

app = create_app(config_class=config.DevelopmentConfig)

if __name__ == '__main__':
    app.run()
