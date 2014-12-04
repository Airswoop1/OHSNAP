#!/usr/bin/env python
import getpass

from flask.ext.assets import ManageAssets
from flask.ext.script import Server, Manager
from werkzeug.security import check_password_hash, generate_password_hash

from easyfoodstamps import app, db


manager = Manager(app)
manager.add_command("assets", ManageAssets())


@manager.command
def ensure_indices():
    db.users.ensure_index("email", unique=True, dropDups=True)
    db.users.ensure_index("ssn", unique=True, dropDups=True)


@manager.command
def create_admin_user(email, ssn):
    """ Create a new admin user. """
    password = getpass.getpass()
    password = generate_password_hash(password)
    print db.users.insert(dict(email=email, password=password, ssn=ssn))


if __name__ == "__main__":
    manager.run()
