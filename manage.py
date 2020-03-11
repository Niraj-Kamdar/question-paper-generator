from flaskapp import app, Migrate, Manager, MigrateCommand, db

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskapp/site.db'
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == "__main__":
    manager.run()
