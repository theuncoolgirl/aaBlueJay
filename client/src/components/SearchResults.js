import { Container } from "@material-ui/core";
import React from "react";
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';

const SearchResults = () => {
    const rows = useLocation().state
    const token = useSelector(state => state.session.id);
    const results = useSelector(state => state.search.currentResults)

    if (!token) {
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <h1>So many options...</h1>
            <Grid container space={2} style={{ overflow: 'hidden' }}>
                    {results.map((row) => (
                        <Grid  item sm={3}>
                            <Typography><a href={`/coins/${row.id}`}
                            // style={{margin:'5px', color:'black', textDecoration: 'none'}}
                            key={row.name}>
                            {row.name}</a></Typography>
                        </ Grid>
                    ))}
            </Grid>
        </Container>
    )
}

export default SearchResults
