from flask_migrate import Migrate
from flask_migrate import MigrateCommand
from flask_script import Manager

from flaskapp import create_app
from flaskapp import db

app = create_app()
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command("db", MigrateCommand)

if __name__ == "__main__":
    manager.run()
