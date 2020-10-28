import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/coin';
import ChartComponent from './stockchartComponents/ChartComponent'
import { Grid } from '@material-ui/core';
import useStyles from '../styles.js';

function CoinDetails(props) {
    const classes = useStyles();
    const {
        updateCoinIdValue,
        // eslint-disable-next-line
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
        // eslint-disable-next-line
    }, [coinId]);

    const displayChangeData = (priceChange, percentChange) => {
        if (priceChange.usd) {
            if (priceChange.usd > 0) {
                return <li>+${priceChange.usd.toFixed(2)} (+{percentChange.usd.toFixed(2)}%) Today</li>
            } else {
                return <li>-${Math.abs(priceChange.usd).toFixed(2)} (-{Math.abs(percentChange.usd).toFixed(2)}%) Today</li>
            }
        } else return null
    }

    return (
        <div className={classes.grow} style={{
            paddingLeft: 30,
            paddingRight: 30,
            maxWidth: '60%',
        }}>
            <ChartComponent className='stockchart' />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}
            >
                <Grid item xs={8}></Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            <h2>{coinId}</h2>
            {name ?
                <ul>
                    <li>Name: {name}</li>
                    <li>Symbol: {symbol}</li>
                    {description !== "" ?
                        <li>Description: <span dangerouslySetInnerHTML={{ __html: description }} ></span></li>
                        : null}
                    {current_price_usd.usd ?
                        <li>Current price: ${current_price_usd.usd.toFixed(3)}</li>
                        : null}
                    {displayChangeData(price_change_usd, percent_change_usd)}
                    {chart_data.length > 0 ?
                        <li className="5">{chart_data}</li>
                        : null}
                </ul>
                : <h2>Loading...</h2>}
        </div>
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
