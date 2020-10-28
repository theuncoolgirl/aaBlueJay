import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from starter_app.models import db, User
from starter_app.api.user_routes import user_routes
from starter_app.api.coin_routes import coin_routes
from flask_migrate import Migrate
from starter_app.config import Config

app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(coin_routes, url_prefix='/api/coins')
db.init_app(app)
Migrate(app, db)
login = LoginManager(app)

# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    # print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
