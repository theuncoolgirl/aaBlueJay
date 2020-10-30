import React from 'react';
import { Typography } from '@material-ui/core';

const NotFound = () => {

    return (
        <>
            <img src="/doge.png" alt="404img" style={{height:500}}/>
            <img src="/leftdoge.png" alt="404img" />
            <span><Typography variant="h2">404, We ate your results</Typography></span>
        </>
    )
}

export default NotFound
