from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from flaskapp import create_app, db
from flaskapp.config import Config

app = create_app(config_class=Config)
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command("db", MigrateCommand)

if __name__ == "__main__":
    manager.run()
