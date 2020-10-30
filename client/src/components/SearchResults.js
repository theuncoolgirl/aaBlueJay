import { Container } from "@material-ui/core";
import React from "react";
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../styles.js';

const SearchResults = () => {
    const classes = useStyles();
    const rows = useLocation().state
    const token = useSelector(state => state.session.id);
    if (!token) {
        return <Redirect to="/" />;
    }
    debugger
    return (
        <Container>
            <Typography className={classes.title} variant="h4">So many options...</Typography>
            <Grid container space={2} className={classes.hidden}>
                {rows.map((row) => (
                    <Grid item sm={3}>
                        <Typography className={classes.link}><a className={classes.link} href={`/coins/${row.id}`}
                            key={row.name}>
                            {row.name}</a></Typography>
                    </ Grid>
                ))}
            </Grid>
        </Container>
    )
}
export default SearchResults