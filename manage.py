from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from flaskapp import create_app, db
from flaskapp.config import DevelopmentConfig

app = create_app(config_class=DevelopmentConfig)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskapp/site.db'
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == "__main__":
    manager.run()
