from flask import Blueprint, jsonify
from starter_app.models import User, Friend, Purchase
from flask_login import current_user, login_user, logout_user
from flask import request
from ..models import User, db, Purchase
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
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {}


@user_routes.route("/login", methods=["POST"])
def login():
    if current_user.is_authenticated:
        return current_user.to_dict()

    data = request.json
    form = LoginForm(csrf_token=request.headers['x-Csrftoken'])
    if form.validate_on_submit():
        data = request.json
        user = User.query.filter(User.email == data['email']).first()
        if not user or not user.check_password(data['password']):
            return {'error': 'No match found for username and password.'}
        login_user(user)
        return user.to_dict()
    print(form.errors)
    return form.errors


@user_routes.route("/signup", methods=["POST"])
def sign_up():
    if current_user.is_authenticated:
        return current_user.to_dict()
    form = SignUpForm(csrf_token=request.headers['x-Csrftoken'])
    if form.validate_on_submit():
        data = request.json
        user = User(firstname=data['firstname'],
                    lastname=data['lastname'],
                    username=data['username'],
                    email=data['email'],
                    password=data['password'])
        login_user(user)
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return form.errors


@user_routes.route('/logout', methods=["POST"])
def logout():
    logout_user()
    return {'logout': 'success'}


@user_routes.route('/get_csrf')
def get_csrf_token():
    form = LoginForm()
    return {'csrfT': form.csrf_token._value()}


@user_routes.route('/purchases/<int:id>')
def purchase_history(id):
    purchases = Purchase.query.filter(Purchase.userId == id).all()
    print(purchases)
    res = [purchase.to_dict() for purchase in purchases]
    return {'purchases': res}


@user_routes.route('/purchases/new', methods=["POST"])
def add_purchase():
    data = request.json
    purchase = Purchase(userId=data['userId'],
                        purchasePrice=data['purchasePrice'],
                        purchaseQuantity=data['purchaseQuantity'])
    # increase amount of cash in bank by the
    # amount of the share/currency purchases
    user = User.query.filter(User.id == data['userId']).first()
    print('my user ===========', user)
    user.cash = user.cash + int(data['purchasePrice'])
    db.session.add(purchase)
    db.session.commit()
    # purchase = Purchase.query.order_by(Purchase.purchaseDate.desc()).first()
    print(purchase.to_dict())
    return {'purchase': purchase.to_dict()}

# @user_routes.route('/purchases/<int:id>/delete', methods=["DELETE"])
# def delete_purchase(id):
    

@user_routes.route('/friends/<int:id>')
def friends_load(id):
    friends = Friend.query.filter(Friend.userId == id).all()
    # for x in friends:
    #     print(x.friend.to_dict())
    res = [x.friend.to_dict() for x in friends]
    print(res)
    return {'friends': res}
