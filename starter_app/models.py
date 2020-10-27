from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# friend = db.Table(
#     'friends',
#     db.metadata,

# )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)
    cash = db.Column(db.Integer, default=0)

    # recommendation = db.relationship("Recommendation", back_populates="user")
    purchases = db.relationship("Purchase", back_populates="user")
    userlists = db.relationship("UserList", back_populates="user")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email
        }

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Friend(db.Model):
    __tablename__ = 'friends'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    friendId = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", foreign_keys=userId)
    friend = db.relationship("User", foreign_keys=friendId)


class Purchase(db.Model):
    __tablename__ = "purchases"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    purchaseDate = db.Column(db.DateTime, nullable=False,
                             server_default=db.text("CURRENT_TIMESTAMP"))
    purchasePrice = db.Column(db.Integer, nullable=False)
    purchaseQuantity = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="purchases")


class Recommendation(db.Model):
    __tablename__ = "recommendations"
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    friendId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    tickerSymbol = db.Column(db.String(20), nullable=False)
    message = db.Column(db.String(500))

    user = db.relationship("User", foreign_keys=userId)
    friend = db.relationship("User", foreign_keys=friendId)


class UserList(db.Model):
    __tablename__ = "userlists"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    listName = db.Column(db.String(50), nullable=False)

    user = db.relationship("User", back_populates="userlists")
    currencylist = db.relationship("CurrencyList", foreign_keys=userId)
    currencylist = db.relationship(
        "CurrencyList", back_populates="userlist")


class CurrencyList(db.Model):
    __tablename__ = "currencylists"

    id = db.Column(db.Integer, primary_key=True)
    listId = db.Column(db.Integer, db.ForeignKey("userlists.id"), nullable=False)  # noqa
    tickerSymbol = db.Column(db.String(20), nullable=False)

    userlist = db.relationship("UserList", back_populates="currencylist")
