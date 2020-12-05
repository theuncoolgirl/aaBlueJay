import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from '../styles';

const NotFound = () => {
    const classes = useStyles();
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 50 }}>
                <Container className={classes.doge} alt="404img" style={{ height: 500, width: 500 }} />
                <Container className={classes.dogeleft} alt="404img" style={{ height: 300, width: 300 }} />
            </div>
            <span ><Typography variant="h2">404, We ate your results</Typography></span>
        </>
    )
}

export default NotFound
