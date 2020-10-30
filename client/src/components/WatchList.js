import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { thunks } from '../store/list';
import CurrenceyTableRow from './CurrencyTableRow';
import { useStyles } from '../styles.js';

export default function BasicTable() {
  const classes = useStyles();
  const { listName } = useParams()
  const userId = useSelector((state) => state.session.id)
  const userCurrentList = useSelector((state) => state.list.currentList)
  const lists = useSelector((state) => state.list.lists)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunks.getUserWatchlist(userId, listName));
    // eslint-disable-next-line
  }, [userId, listName]);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">7-Day Performance</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Today</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userCurrentList.map((row) => (
            <CurrenceyTableRow row={row} deleteIcon={true} key={`list-${row.id}`} listIdToDelete={lists ? lists[0][1] : null} spark={true}>
            </ CurrenceyTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
