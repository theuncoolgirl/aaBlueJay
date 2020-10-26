from flask import Blueprint, jsonify
from starter_app.models import User, Friend
from flask_login import current_user, login_user, logout_user
from flask import request
from ..models import User, db
from ..forms import LoginForm, SignUpForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = Friend.query.filter(Friend.userId == 1).all()
    for friendship in response:
        print('user', friendship.user.email)
        print('friend', friendship.friend.email)
    return {'daniel': 10}
    return {"users": [user.to_dict() for user in response]}


@user_routes.route('/load')
def load_user():
    return current_user.to_dict()


@user_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    form = LoginForm(csrf_token=request.headers['x-Csrftoken'])
    # form = LoginForm()
    form.validate_on_submit()
    print(form.errors)
    if current_user.is_authenticated:
        return current_user.to_dict()
    data = request.json
    user = User.query.filter(User.email == data['email']).first()
    if not user or not user.check_password(data['password']):
        return {'login': 'failed'}
    login_user(user)
    return user.to_dict()


@user_routes.route("/signup", methods=["POST"])
def sign_up():
    print({**request.json})
    form = SignUpForm(csrf_token=request.headers['x-Csrftoken'])
    form.validate_on_submit()
    print(form.errors)
    if current_user.is_authenticated:
        return current_user.to_dict()
    user = User(**request.json)
    db.session.add(user)
    db.session.commit()
    return user.to_dict()


@user_routes.route('/logout', methods=["POST"])
def logout():
    logout_user()
    return {'logout': 'success'}


@user_routes.route('/get_csrf')
def get_csrf_token():
    form = LoginForm()
    return {'csrfT': form.csrf_token._value()}
