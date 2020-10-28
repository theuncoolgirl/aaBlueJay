import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams, useHistory, useLocation } from 'react-router-dom';

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


const SearchResults = () => {
    const rows = useLocation().state
    const token = useSelector(state => state.session.id);

    console.log(rows)
    // useEffect(()=>{
    //     // dispatch(explore_all_load(id))
    //   // eslint-disable-next-line
    //   }, [id])

    if (!token) {
        return <Redirect to="/" />;
    }

    return (
        <>
        {rows.map((row) => (
            <span style={{margin:'10px'}}>{row.name}</span>
        ))}
      </>
    )
}

export default SearchResults
