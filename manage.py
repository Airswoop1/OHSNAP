#!/usr/bin/env python
from flask.ext.script import Server, Manager

from easyfoodstamps import app


manager = Manager(app)


if __name__ == "__main__":
    manager.run()
