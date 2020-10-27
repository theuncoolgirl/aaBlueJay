from flask import Blueprint, jsonify
from flask import request
from pycoingecko import CoinGeckoAPI

coin_routes = Blueprint('coins', __name__)
cg = CoinGeckoAPI()


# @currency_routes.route('/')
# def test():
#     return {'test': 'test3'}


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
        sparkline="false"
    )

    chart_data = cg.get_coin_ohlc_by_id(
        id=coin_id,
        vs_currency=vs_currency,
        days=days
    )

    data = {**coin_data, "chart_data": chart_data}

    # res = {key: data[key] for key in data.keys() & {
    #     'id',
    #     'chart_data',
    #     'description',
    #     'market_data',
    #     'name',
    #     'symbol'
    # }}

    res =  {
        'description': data['description']['en'],
        'id': data['id'],
        'name': data['name'],
        'symbol': data['symbol'],
        'current_price_usd': data['market_data']['current_price']['usd'],
        'percent_change_usd': data['market_data']['market_cap_change_percentage_24h_in_currency']['usd'],
        'price_change_usd': data['market_data']['price_change_24h_in_currency']['usd'],
        'chart_data': data['chart_data']
    }
    return res
