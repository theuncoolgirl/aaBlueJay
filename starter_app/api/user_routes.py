from flask import Blueprint, jsonify
from starter_app.models import User, Friend

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = Friend.query.filter(Friend.userId == 1).all()
    for friendship in response:
        print(friendship.friend)
    return {'daniel': 10}
    # return {"users": [user.to_dict() for user in response]}
