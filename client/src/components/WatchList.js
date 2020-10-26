import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import bitcoin from '../test data/bit'
const bitcoinSimple = {
  name: bitcoin.name,
  symbol: bitcoin.symbol,
  price: bitcoin.market_data.current_price.usd,
  today: bitcoin.market_data.price_change_percentage_24h_in_currency.usd,
  marketCap: bitcoin.market_data.market_cap.usd
}
console.log(bitcoin.market_data.current_price.usd)

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

console.log(bitcoinSimple)
const rows = [
  bitcoinSimple,
];

export default function BasicTable() {
  const classes = useStyles();

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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.today}</TableCell>
              <TableCell align="right">{row.marketCap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
