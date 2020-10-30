import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { load_purchase_history } from '../store/purchase'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

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


    useEffect(()=>{
        dispatch(load_purchase_history(id))
      // eslint-disable-next-line
    }, [id])

    const handleClick = (e) => {
        const coinId = allCoins.filter(coin => {
            return (coin.name === e.target.innerHTML.trim())
        })
        history.push(`/coins/${coinId[0].id}`)
    }

    if (!id) {
        return <Redirect to="/" />;
    }

    return (
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
            {purchases.map(purchase => <TableRow key={`purchase-${purchase.tickerSymbol}`}>
                <TableCell component="th" scope="row" onClick={handleClick} > {purchase.tickerSymbol} </TableCell>
                {/* <TableCell align="right">{row.symbol}</TableCell> */}
                {(purchase.purchasePrice > 0) ? <TableCell style={{color:'green'}} align="right">Bid: ${purchase.purchasePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell> :
                 <TableCell  style={{color:'red'}} align="right">Sold: ${purchase.purchasePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>}
                <TableCell align="right">{purchase.purchaseQuantity}</TableCell>
                <TableCell align="right">{purchase.purchaseDate}</TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default PurchaseHistory
