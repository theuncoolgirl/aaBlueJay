import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import CurrenceyTableRow from "./CurrencyTableRow";
import { explore_all_load } from '../store/explore'
import { useStyles } from '../styles.js';


const ExploreCurrencies = () => {
  const { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch()
  const token = useSelector(state => state.session.id);
  const rows = useSelector(state => state.explore)
  const classes = useStyles();

  useEffect(() => {
    console.log('in explore')
    dispatch(explore_all_load(id))
    // eslint-disable-next-line
  }, [id])

  const handleChange = (event, value) => {
    let page = Number(value)
    history.push(`/explore/${page}`)
  }

  if (!token) {
    return null;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Today</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              return < CurrenceyTableRow row={row} key={`${row.name}-${idx}`} deleteIcon={false} />
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={100} onChange={handleChange} showFirstButton showLastButton />
    </>
  )
}

export default ExploreCurrencies
