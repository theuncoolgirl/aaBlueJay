import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/coin';
import ChartComponent from './stockchartComponents/ChartComponent'
import { Button, Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import useStyles from '../styles.js';
import CoinModal from './CoinModal';

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
        // chart_data,
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
                return <>
                    <Typography variant="subtitle2">+${priceChange.usd.toFixed(2)} (+{percentChange.usd.toFixed(2)}%)  <span style={{ fontWeight: "lighter" }}>Today</span></Typography>
                </>
            } else {
                return <>
                    <Typography variant="subtitle2">-${Math.abs(priceChange.usd).toFixed(2)} (-{Math.abs(percentChange.usd).toFixed(2)}%)  <span style={{ fontWeight: "lighter" }}>Today</span></Typography>
                </>
            }
        } else return null
    }

    return (
        <Container className={classes.container} justify="space-around">
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="flex-start"
                spacing={6}
                style={{ maxWidth: "80%" }}
            >
                <Grid item xs={8}>
                    {
                        name ?
                            <div>
                                <Typography variant="h5">
                                    {name}
                                </Typography>
                                {current_price_usd.usd ?
                                    <Typography variant="h5">
                                        ${current_price_usd.usd.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                                    </Typography>
                                    : null}
                                {displayChangeData(price_change_usd, percent_change_usd)}
                                <ChartComponent className='stockchart' />
                                {description !== "" ?
                                    <div>
                                        <Typography variant="h6">About</Typography>
                                        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                                        <Typography variant="caption"><span dangerouslySetInnerHTML={{ __html: description }}></span></Typography>
                                    </div>
                                    : null}
                            </div>
                            : <h2>Loading...</h2>}
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'center' }}>
                    {name ?
                        <>
                            <Paper elevation={3} style={{ textAlign: 'center', padding: 10 }}>
                                <Typography variant="subtitle2">Buy {symbol.toUpperCase()}</Typography>
                                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                                <div style={{ height: 200 }}>
                                    <Typography variant="subtitle2">Placeholder for Simulation Functionality</Typography>
                                </div>
                            </Paper>
                            <Button variant="outlined" color="primary" style={{ margin: 20 }}>
                                &#10003; Add to List
                        </Button>
                        </>
                        : null}
                </Grid>
            </Grid>
            <CoinModal />
        </Container >
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
