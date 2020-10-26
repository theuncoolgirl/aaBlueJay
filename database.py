# from starter_app.models import User, Purchase, Recommendation, UserList, CurrencyList
from starter_app.models import User, Friend
from starter_app import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    # db.drop_all()
    db.create_all()

    seeder = [
        User(username="demoperson",
             firstname="demo",
             lastname="user",
             email="demo@example.com",
             password="password",
             cash=1000),
        User(username="demopersontwo",
             firstname="second",
             lastname="person",
             email="second@example.com",
             password="password"),
        User(username="moneyuser",
             firstname="money",
             lastname="user",
             password="password",
             email="money@money.com",
             cash=5000),
        Friend(
            userId=1,
            friendId=2,
        ),
        Friend(
            userId=1,
            friendId=3
        )
    ]

    for seed in seeder:
        db.session.add(seed)
    db.session.commit()
    # purchase1 = Purchase(
    #     userid="",
    #     #  purchaseDate="", DEFAULT
    #     purchasePrice="",
    #     purchaseQuantity="")

    # rec1 = Recommendation(userId=1,
    #                       friendId=2,
    #                       tickerSymbol="BTC",
    #                       message="Take a look at this trade!")
    # rec2 = Recommendation(userId=2,
    #                       friendId=3,
    #                       tickerSymbol="LTC",
    #                       message="Buy this one!!!")
