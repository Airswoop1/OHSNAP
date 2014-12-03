#!/usr/bin/env python
from flask.ext.assets import ManageAssets
from flask.ext.script import Server, Manager

from easyfoodstamps import app, db


manager = Manager(app)
manager.add_command("assets", ManageAssets())


@manager.command
def create_admin_user():
    """ Create a new admin user. """
    pass


if __name__ == "__main__":
    manager.run()
