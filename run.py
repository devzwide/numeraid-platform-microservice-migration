import os

from app import create_app, socketio
from app.extensions import db

app = create_app()

debug_mode = os.environ.get("FLASK_DEBUG", "False").lower() in {"1", "true", "yes", "on"}

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    socketio.run(app, host="0.0.0.0", port=5000, debug=debug_mode, allow_unsafe_werkzeug=True)