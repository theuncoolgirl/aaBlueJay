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
        'description': data['description']['en'],
        'id': data['id'],
        'name': data['name'],
        'symbol': data['symbol'],
        'current_price_usd': data['market_data']['current_price'],
        'percent_change_usd': data['market_data']['market_cap_change_percentage_24h_in_currency'],
        'price_change_usd': data['market_data']['price_change_24h_in_currency'],
        'chart_data': data['chart_data']
    }
    return res

  
@coin_routes.route('/explore/<int:id>')
def explore_load(id):
    print(int(id))
    coins = cg.get_coins_markets(vs_currency='usd',
                                 per_page=50,
                                 page=id)
    return {'coins': coins}
  
  
@coin_routes.route("/list", methods=["PUT"])
def list_route():
    vs_currency, user_id = request.json.values()

    query = (
        UserList.query.options(joinedload("currencylist"))
        .filter(UserList.userId == user_id)
        .first()
    )
    
    
    coin_data = cg.get_coins_markets(vs_currency="usd")
    # print(coin_data)
    currencylist = [
        currencylist.tickerSymbol.lower() for currencylist in query.currencylist
    ]

    res = dict()
    for item in coin_data:
        print(item["symbol"])
        if item["symbol"] in currencylist:
            res[item["symbol"]] = item

            
    return res


@coin_routes.route("/names")
def load_names():
    coin_names = cg.get_coins_list()
    return {"coin_names": coin_names}
