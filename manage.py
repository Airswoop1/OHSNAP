#!/usr/bin/env python
from flask.ext.assets import ManageAssets
from flask.ext.script import Server, Manager

from easyfoodstamps import app


manager = Manager(app)
manager.add_command("assets", ManageAssets())


if __name__ == "__main__":
    manager.run()
