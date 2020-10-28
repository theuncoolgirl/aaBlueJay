import React, { useEffect } from 'react';
// import { useState } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/coin';


function CoinDetails(props) {
    // const [users, setUsers] = useState([]);
    const {
        updateCoinIdValue,
        receiveCoinDetails,
        getCoinDetails,
        description,
        name,
        symbol,
        current_price_usd,
        percent_change_usd,
        price_change_usd,
        chart_data,
        match: {
            params: {
                coinId
            }
        }
    } = props;

    // updateCoinIdValue - coinId is pulled from props.match.params and is used
    // to update state; getCoinDetails - uses this coinId to fetch from backend
    // route coin details from coingecko API
    useEffect(() => {
        updateCoinIdValue(coinId);
        getCoinDetails();
    }, []);

    // const description_parsed = document.createElement('span')
    // description_parsed.innerHTML = description
    // console.log("description parsed: ", description_parsed)

    // var parser = new DOMParser();
    // var doc = parser.parseFromString(description, 'text/html');

    // const descriptionParser = (string) => {
    //     const element = docu
    // }
    return (
        <>
            <h1>Coin Details: </h1>
            <h2>{coinId}</h2>
            {name ?
                <ul>
                    <li>Name: {name}</li>
                    <li>Symbol: {symbol}</li>
                    <li>Description: <span dangerouslySetInnerHTML={{ __html: description }} ></span></li>
                    <li>Current price: ${current_price_usd}</li>
                    {percent_change_usd > 0 ?
                        <li>+${price_change_usd.toFixed(2)} (+{percent_change_usd.toFixed(2)}%) Today</li> :
                        <li>-${Math.abs(price_change_usd).toFixed(2)} (-{Math.abs(percent_change_usd).toFixed(2)}%) Today</li>
                    }
                    <li>{chart_data}</li>
                </ul>
                : <h2>Loading...</h2>}
        </>
    );
}

const mapStateToProps = state => {
    return {
        coinId: state.coin.coinId,
        description: state.coin.description,
        name: state.coin.name,
        symbol: state.coin.symbol,
        current_price_usd: state.coin.current_price_usd,
        percent_change_usd: state.coin.percent_change_usd,
        price_change_usd: state.coin.price_change_usd,
        chart_data: state.coin.chart_data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCoinIdValue: value => dispatch(actions.updateCoinIdValue(value)),
        receiveCoinDetails: value => dispatch(actions.receiveCoinDetails(value)),
        getCoinDetails: () => dispatch(thunks.getCoinDetails()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetails);