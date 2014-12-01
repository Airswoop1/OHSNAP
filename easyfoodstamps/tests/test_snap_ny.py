import os
import unittest
import tempfile

from api import app, snap_ny


class FlaskrTestCase(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()

    def test_generate_signature_pdfs(self):
        snap_ny.generate_signature_pdfs()

    def tearDown(self):
        pass


if __name__ == '__main__':
    unittest.main()
