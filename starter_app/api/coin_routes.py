from flask import Blueprint, jsonify
from flask import request
from pycoingecko import CoinGeckoAPI
from ..models import UserList, CurrencyList, db
from sqlalchemy.orm import joinedload

coin_routes = Blueprint("coins", __name__)
cg = CoinGeckoAPI()


@coin_routes.route("/", methods=["PUT"])
def coin():
    coin_id, days, vs_currency = request.json.values()

    coin_data = cg.get_coin_by_id(
        id=coin_id,
        localization="false",
        tickers="false",
        market_data="true",
        community_data="false",
        developer_data="false",
        sparkline="false",
    )

    chart_data = cg.get_coin_ohlc_by_id(id=coin_id, vs_currency=vs_currency, days=days)

    data = {**coin_data, "chart_data": chart_data}

    res = {
        "description": data["description"]["en"],
        "id": data["id"],
        "name": data["name"],
        "symbol": data["symbol"],
        "current_price_usd": data["market_data"]["current_price"],
        "percent_change_usd": data["market_data"][
            "market_cap_change_percentage_24h_in_currency"
        ],
        "price_change_usd": data["market_data"]["price_change_24h_in_currency"],
        "chart_data": data["chart_data"],
    }
    return res


@coin_routes.route("/explore/<int:id>")
def explore_load(id):
    print(int(id))
    coins = cg.get_coins_markets(vs_currency="usd", per_page=50, page=id)
    return {"coins": coins}


@coin_routes.route("/list", methods=["PUT"])
def list_route():
    vs_currency, user_id = request.json.values()

    query = (
        UserList.query.options(joinedload("currencylist"))
        .filter(UserList.userId == user_id)
        .first()
    )

    currencylist = [
        (currencylist.tickerSymbol.lower(), currencylist.id)
        for currencylist in query.currencylist
    ]
    currencylistSimple = [
        currencylist.tickerSymbol.lower() for currencylist in query.currencylist
    ]

    def filterIds(currencylistSimple):
        return [
            stock["id"]
            for stock in cg.get_coins_list()
            if stock["symbol"] in currencylistSimple
        ]

    currencylistIds = filterIds(currencylistSimple)
    coin_data = cg.get_coins_markets(
        sparkline="true",
        vs_currency="usd",
        ids=currencylistIds,
    )

    res = {"watchlist": coin_data}

    return res


@coin_routes.route("/names")
def load_names():
    coin_names = cg.get_coins_list()
    return {"coin_names": coin_names}


@coin_routes.route("/list/delete", methods=["DELETE"])
def delete_list_item():
    listId = int(request.json["listId"])
    # print(listId)
    toDelete = CurrencyList.query.get(listId)
    print(toDelete.tickerSymbol)
    db.session.delete(toDelete)
    db.session.commit()

    return {"symbol": toDelete.tickerSymbol}


@coin_routes.route("/list/add", methods=["POST"])
def add_list_item():
    listId = int(request.json["listId"])
    symbol = request.json["symbol"]
    # print(listId)

    if CurrencyList.query.filter(
        CurrencyList.listId == listId, CurrencyList.tickerSymbol == symbol
    ).first():
        return {"message": "This coin is already in this list"}

    toAdd = CurrencyList(listId=listId, tickerSymbol=symbol)

    db.session.add(toAdd)
    db.session.commit()

    return {"message": toAdd.tickerSymbol + "was added"}


@coin_routes.route("/list/all", methods=["PUT"])
def get_user_lists():
    user_id = int(request.json["user_id"])
    user_lists = UserList.query.filter(UserList.userId == user_id).all()
    print(user_lists[0].listName)
    listNames = [(name.listName, name.id) for name in user_lists]
    return {"lists": listNames}
