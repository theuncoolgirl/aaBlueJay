import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { thunks } from '../store/list';
import CurrenceyTableRow from './CurrencyTableRow';

// import bitcoin from '../test data/bit'
// const bitcoinSimple = {
//   name: bitcoin.name,
//   symbol: bitcoin.symbol,
//   price: bitcoin.market_data.current_price.usd,
//   today: bitcoin.market_data.price_change_percentage_24h_in_currency.usd,
//   marketCap: bitcoin.market_data.market_cap.usd
// }
// console.log(bitcoin.market_data.current_price.usd)
// const rows = [
//   bitcoinSimple,
// ];



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function BasicTable() {
  const classes = useStyles();

  const userId = useSelector((state) => state.session.id)
  const userWatchlist = useSelector((state) => state.list.watchlist)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunks.getUserWatchlist(userId));
    // eslint-disable-next-line
  }, [userId]);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Today</TableCell>
            <TableCell align="right">Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userWatchlist.map((row) => (
            <CurrenceyTableRow row={row} deleteIcon={true} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
