import { Container } from "@material-ui/core";
import React from "react";
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { Divider, Grid, Paper } from '@material-ui/core';

const SearchResults = () => {
    const rows = useLocation().state
    const token = useSelector(state => state.session.id);

    if (!token) {
        return <Redirect to="/" />;
    }

    debugger
    return (
        <Container>
            <h1>Results</h1>
            <Grid container space={2}>
                    {rows.map((row) => (
                        <Grid  item sm={3}>
                            <a href={`/coins/${row.id}`}
                            style={{margin:'5px', color:'black', textDecoration: 'none'}}
                            key={row.name}>
                            {row.name}</a>
                        </ Grid>
                    ))}
            </Grid>
        </Container>
    )
}

export default SearchResults
