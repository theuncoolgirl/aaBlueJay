# from starter_app.models import User, Purchase, Recommendation, UserList, CurrencyList
from starter_app.models import User, Friend, UserList, CurrencyList
from starter_app import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    user1 = User(username="demoperson",
                 firstname="demo",
                 lastname="user",
                 email="demo@example.com",
                 password="password",
                 cash=1000)
    user2 = User(username="demopersontwo",
                 firstname="second",
                 lastname="person",
                 email="second@example.com",
                 password="password")
    user3 = User(username="moneyuser",
                 firstname="money",
                 lastname="user",
                 password="password",
                 email="money@money.com",
                 cash=5000)

    f1 = Friend(
        userId=1,
        friendId=2,
    )
    f2 = Friend(
        userId=1,
        friendId=3
    )
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

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(f1)
    db.session.add(f2)
    # db.session.add(purchase1)
    # db.session.add(rec1)
    # db.session.add(rec2)

    User(username="UserTest",
         firstname="TestFirstName",
         lastname="TestLastName",
         password="password",
         email="test@test.com",
         cash=50000),
    Friend(
        userId=3,
        friendId=4),
    Friend(
        userId=2,
        friendId=4),
    UserList(userId=1,
             listName="Watch List"),
    UserList(userId=2,
             listName="Watch List"),
    UserList(userId=3,
             listName="Watch List"),
    UserList(userId=4,
             listName="Watch List"),
    CurrencyList(listId=1,
                 tickerSymbol="ETH"),
    CurrencyList(listId=1,
                 tickerSymbol="XRP"),
    CurrencyList(listId=1,
                 tickerSymbol="LTC"),
    CurrencyList(listId=1,
                 tickerSymbol="USDT"),
    CurrencyList(listId=1,
                 tickerSymbol="BCH"),
    CurrencyList(listId=1,
                 tickerSymbol="BSV"),
    CurrencyList(listId=1,
                 tickerSymbol="XMR"),
    CurrencyList(listId=1,
                 tickerSymbol="EOS"),
    CurrencyList(listId=2,
                 tickerSymbol="BNB"),
    CurrencyList(listId=2,
                 tickerSymbol="BSV"),
    CurrencyList(listId=2,
                 tickerSymbol="USDT"),
    CurrencyList(listId=2,
                 tickerSymbol="LTC"),
    CurrencyList(listId=2,
                 tickerSymbol="ETH"),
    CurrencyList(listId=1,
                 tickerSymbol="TRX"),
    CurrencyList(listId=2,
                 tickerSymbol="XMR"),
    CurrencyList(listId=2,
                 tickerSymbol="ADA"),
    CurrencyList(listId=2,
                 tickerSymbol="XTZ"),
    CurrencyList(listId=1,
                 tickerSymbol="WBTC"),
    CurrencyList(listId=3,
                 tickerSymbol="XTZ"),
    CurrencyList(listId=3,
                 tickerSymbol="TRX"),
    CurrencyList(listId=3,
                 tickerSymbol="WBTC"),
    CurrencyList(listId=3,
                 tickerSymbol="LTC"),
    CurrencyList(listId=3,
                 tickerSymbol="DOT"),
    CurrencyList(listId=3,
                 tickerSymbol="BTC"),
    CurrencyList(listId=3,
                 tickerSymbol="ADA"),
    CurrencyList(listId=3,
                 tickerSymbol="ETH"),
    CurrencyList(listId=3,
                 tickerSymbol="FIL"),
    CurrencyList(listId=3,
                 tickerSymbol="VET"),
    CurrencyList(listId=3,
                 tickerSymbol="DAI")
    db.session.commit()
