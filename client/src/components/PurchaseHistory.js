import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { load_purchase_history } from '../store/purchase'
import { makeStyles } from '@material-ui/core/styles';
import { Table, Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import DisplayLists from './DisplayLists';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PurchaseHistory = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useSelector(state => state.session.id);
  const purchases = useSelector(state => state.purchase)
  const allCoins = useSelector(state => state.search.allCoins)
  const classes = useStyles();
  // const filteredPurchases = purchases.filter()


  useEffect(() => {
    dispatch(load_purchase_history(id))
    // eslint-disable-next-line
  }, [id])

  const handleClick = (e) => {
    const coinId = allCoins.filter(coin => {
      return (coin.name === e.target.innerHTML.trim())
    })
    if (coinId.length === 0) {
      return
    }
    history.push(`/coins/${coinId[0].id}`)
  }

  if (!id) {
    return <Redirect to="/" />;
  }

  if (purchases) {
    // determine owned coins from purchase history
    const ownedCoins = (purchaseHistory) => {
      let uniquePurchases = {}
      purchaseHistory.forEach(purchase => {
        if (uniquePurchases[purchase.tickerSymbol]) {
          uniquePurchases[purchase.tickerSymbol] += purchase.purchaseQuantity
        } else {
          uniquePurchases[purchase.tickerSymbol] = purchase.purchaseQuantity
        }
      })
      return uniquePurchases
    }
    const ownedCoinsObj = ownedCoins(purchases)
    const coinTickerSybmols = Object.keys(ownedCoinsObj)
    return (
      <>
        <Grid
          container
          direction="row"
          justify="space-around"
          display="flex"
          overflow="show%"
        >
          <Grid className={classes.coinGridItem} item xs={8}>
            <Typography variant='h4'>Owned Coins</Typography>
            <TableContainer style={{width: '600px', margin: '20px auto'}}component={Paper}>
              <Table className={classes.ownedCoinsTable} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Symbol</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coinTickerSybmols.map((symbol, i) => <TableRow key={i}>
                    <TableCell align='center' component="th" scope="row" onClick={handleClick}>{symbol}</TableCell>
                    <TableCell align='center' >{(ownedCoinsObj[symbol]).toFixed(2)}</TableCell>
                  </TableRow>)}
                </TableBody>
              </Table>
            </TableContainer>


            <Typography variant='h4'>Purchase History</Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Name</TableCell> */}
                    {/* <TableCell align="left">7-Day Performance</TableCell> */}
                    <TableCell align="right">Symbol</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Purchase Date</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchases.map(purchase => <TableRow key={`purchase-${purchase.tickerSymbol}-${purchase.id}`}>
                    <TableCell component="th" scope="row" onClick={handleClick} > {purchase.tickerSymbol} </TableCell>
                    {/* <TableCell align="right">{row.symbol}</TableCell> */}
                    {(purchase.purchasePrice > 0) ? <TableCell style={{ color: 'green' }} align="right">Bid: ${purchase.purchasePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell> :
                      <TableCell style={{ color: 'red' }} align="right">Sold: ${purchase.purchasePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>}
                    <TableCell align="right">{purchase.purchaseQuantity}</TableCell>
                    <TableCell align="right">{purchase.purchaseDate}</TableCell>
                  </TableRow>)}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid className={classes.center} item xs={3}>
            <DisplayLists />
          </Grid>
        </Grid>
      </>
    )
  } else {
    return (
      <>
        <Grid
          container
          direction="row"
          justify="space-around"
          display="flex"
          overflow="show%"
        >
          <Grid className={classes.coinGridItem} item xs={8}>
            <h2>No Coins Purchased Yet</h2>
            <Typography variant='h4'>Purchase History</Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Name</TableCell> */}
                    {/* <TableCell align="left">7-Day Performance</TableCell> */}
                    <TableCell align="right">Symbol</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Purchase Date</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchases.map(purchase => <TableRow key={`purchase-${purchase.tickerSymbol}-${purchase.id}`}>
                    <TableCell component="th" scope="row" onClick={handleClick} > {purchase.tickerSymbol} </TableCell>
                    {/* <TableCell align="right">{row.symbol}</TableCell> */}
                    {(purchase.purchasePrice > 0) ? <TableCell style={{ color: 'green' }} align="right">Bid: ${purchase.purchasePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell> :
                      <TableCell style={{ color: 'red' }} align="right">Sold: ${purchase.purchasePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>}
                    <TableCell align="right">{purchase.purchaseQuantity}</TableCell>
                    <TableCell align="right">{purchase.purchaseDate}</TableCell>
                  </TableRow>)}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid className={classes.center} style={{display: 'flex', justifyContent: 'center'}} item xs={3}>
            <DisplayLists />
          </Grid>
        </Grid>
      </>
    )
  }

}

export default PurchaseHistory
