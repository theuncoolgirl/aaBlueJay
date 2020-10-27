import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';

import CurrenceyTableRow from "./CurrencyTableRow";
import { explore_all_load } from '../store/explore'

const useStyles = makeStyles({
table: {
    minWidth: 650,
},
});


const ExploreCurrencies = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    let history = useHistory();
    const token = useSelector(state => state.session.id);
    const rows = useSelector(state => state.explore)
    const classes = useStyles();

    useEffect(()=>{
        dispatch(explore_all_load(id))
    }, [id])

    const handleChange = (event, value) => {
        let page = Number(value)
        history.push(`/explore/${page}`)
    }

    if (!token) {
        return <Redirect to="/" />;
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <CurrenceyTableRow row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={100} onChange={handleChange} showFirstButton showLastButton />
      </>
    )
}

export default ExploreCurrencies
