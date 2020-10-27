from flask import Blueprint, jsonify
from flask import request
from pycoingecko import CoinGeckoAPI

currency_routes = Blueprint('currencies', __name__)
cg = CoinGeckoAPI()


# @currency_routes.route('/')
# def test():
#     return {'test': 'test2'}


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
