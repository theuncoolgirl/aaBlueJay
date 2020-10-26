from flask import Blueprint, jsonify
from starter_app.models import User, Friend
from flask_login import current_user, login_user, logout_user
from flask import request
from ..models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = Friend.query.filter(Friend.userId == 1).all()
    for friendship in response:
        print(friendship.friend)
    return {'daniel': 10}
    return {"users": [user.to_dict() for user in response]}


@user_routes.route("/login", methods=["POST"])
def login():
    if current_user.is_authenticated:
        return user.to_dict()
    data = request.json
    user = User.query.filter(User.email == data['email']).first()
    if not user or not user.check_password(data['password']):
        return {'login': 'failed'}
    login_user(user)
    return user.to_dict()
    return {'test': 1}


@user_routes.route('/logout', methods=["POST"])
def logout():
    logout_user()
    return {'logout': 'success'}
