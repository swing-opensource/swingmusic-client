"""
This file is used to run the application.
"""
import logging
import sys
from configparser import ConfigParser

import PyInstaller.__main__ as bundler

from app import create_api
from app.functions import run_periodic_checks
from app.lib.watchdogg import watcher as WatchDog
from app.prep import run_setup
from app.utils import background

log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)


app = create_api()
app.static_folder = "../client"

config = ConfigParser()
config.read("pyinstaller.config.ini")


@app.route("/<path:path>")
def serve_client_files(path):
    """
    Serves the static files in the client folder.
    """
    return app.send_static_file(path)


@app.route("/")
def serve_client():
    """
    Serves the index.html file at client/index.html.
    """
    return app.send_static_file("index.html")


ARGS = sys.argv[1:]


class PossibleArgs:
    """
    Enumerates the possible file arguments.
    """

    build = "--build"


class HandleArgs:
    def __init__(self) -> None:
        self.handle_build()

    @staticmethod
    def handle_build():
        """
        Runs Pyinstaller.
        """
        if PossibleArgs.build in ARGS:
            with open("pyinstaller.config.ini", "w", encoding="utf-8") as file:
                config["DEFAULT"]["BUILD"] = "True"
                config.write(file)

            bundler.run(
                [
                    "manage.py",
                    "--onefile",
                    "--name",
                    "alice",
                    "--clean",
                    "--add-data=assets:assets",
                    "--add-data=app/client:client",
                    "--add-data=pyinstaller.config.ini:.",
                    "-y",
                ]
            )

            with open("pyinstaller.config.ini", "w", encoding="utf-8") as file:
                config["DEFAULT"]["BUILD"] = "False"
                config.write(file)

            sys.exit(0)


HandleArgs()


@background
def run_bg_checks() -> None:
    run_setup()
    run_periodic_checks()

@background
def start_watchdog():
    WatchDog.run()


if __name__ == "__main__":
    run_bg_checks()
    start_watchdog()
    app.run(debug=True, threaded=True, host="0.0.0.0", port=1970, use_reloader=False)
