from flask import Blueprint, jsonify
from flask import request
from pycoingecko import CoinGeckoAPI
from ..models import UserList, CurrencyList, db

currency_routes = Blueprint('currencies', __name__)
cg = CoinGeckoAPI()


# @currency_routes.route('/')
# def test():
#     return {'test': 'test3'}


@currency_routes.route("/", methods=["GET"])
def currency():
    currency_id, days, vs_currency = request.json.values()

    coin_data = cg.get_coin_by_id(
        id=currency_id,
        localization="false",
        tickers="false",
        market_data="true",
        community_data="false",
        developer_data="false",
        sparkline="false"
    )

    chart_data = cg.get_coin_ohlc_by_id(
        id=currency_id,
        vs_currency=vs_currency,
        days=days
    )

    data = {**coin_data, "chart_data": chart_data}

    res = {key: data[key] for key in data.keys() & {
        'id',
        'chart_data',
        'description',
        'market_data',
        'name',
        'symbol'
    }}

    # {...,
    # description: {
    # en: ACTUAL DESCRIPTION
    # },
    # ...
    # }
    print(res)
    return res
    # return data["chart_data"]

    # chart_data,
    # description[en],
    # id,
    # market_data[current_price][usd],
    # market_data[high_24h],
    # market_data[low_24h],
    # market_data[market_cap_change_percentage_24h_in_currency][usd],
    # market_data[price_change_24h_in_currency][usd],
    # name,
    # symbol = data.json.values()

@currency_routes.route("/list", methods=["GET"])
def list_route():
    vs_currency, watchlist, user_id = request.json.values()

    db.userListOfCurrencies = session.query(UserList).join(CurrencyList).filter(UserList.userId==user_id).first()
    print(userListOfCurrencies)

    coin_data = cg.get_coins_markets(
        vs_currency="usd"
    )
    print(coin_data)

    res = dict()
    for item in coin_data:
        if item["id"] in watchlist:
            res[item["id"]] = item

    # print(res)
    return res
