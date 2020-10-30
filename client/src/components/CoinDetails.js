import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/coin';
import ChartComponent from './stockchartComponents/ChartComponent'
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import useStyles from '../styles.js';
import CoinModal from './CoinModal';


function CoinDetails(props) {
    const classes = useStyles();
    const {
        updateCoinIdValue,
        getCoinDetails,
        description,
        name,
        symbol,
        current_price_usd,
        percent_change_usd,
        price_change_usd,
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
        <>
            <Grid
                container
                direction="row"
                justify="space-around"
            >
                <Grid className={classes.coinGridItem} item xs={8}>
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
                                <ChartComponent />
                                {description !== "" ?
                                    <div>
                                        <Typography className={classes.about} variant="h6">
                                            About
                                        </Typography>
                                        <Divider className={classes.divider} />
                                        <Typography variant="caption">
                                            <span dangerouslySetInnerHTML={{ __html: description }}></span>
                                        </Typography>
                                    </div>
                                    : null}
                            </div>
                            : <h2>Loading...</h2>}
                </Grid>
                <Grid className={classes.center} item xs={3}>
                    {name ?
                        <>
                            <Paper className={classes.sideCard} elevation={3}>
                                <Typography variant="subtitle2">
                                    Buy {symbol.toUpperCase()}
                                </Typography>
                                <Divider className={classes.divider} />
                                <div className={classes.spacer}>
                                    <Typography variant="subtitle2">
                                        Placeholder for Simulation Functionality
                                    </Typography>
                                </div>
                            </Paper>
                            <CoinModal />
                        </>
                        : null}
                </Grid>
            </Grid>
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
