import React from 'react'
import { Container, Paper, Typography } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { useStyles } from '../styles.js';


const LoggedOutView = () => {
    const classes = useStyles();
    return (

        <BrowserRouter>
            <Paper className={classes.logoBar} elevation={0} style={{ justifyItems: 'center' }}>
                {/* <Container className={classes.logoForLoggedOutView} /> */}
                <img src='/favicon.ico' alt="favicon" className={classes.img} />
            </Paper>
            <Container maxWidth="none" className={classes.background}>
                <Switch>
                    <Route path="/signup">
                        <SignUpForm />
                    </Route>
                    <Route exact path="*">
                        <LoginForm />
                        <Paper className={classes.siteInfoCard} elevation={3}>
                            <Typography className={classes.title} variant='h5'>Explore the world of crypto currencies.</Typography>
                            <Typography variant='subtitle1'>Everyone has heard of bitcoin, but did you know there are so many more? Sign up to explore all of the crypto currencies out there! You might even find some suprising ones like <a className={classes.link} href="https://dogecoin.com/" target='_blank' rel="noopener noreferrer">Dogecoin</a>.</Typography>
                        </Paper>
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter >
    )
}

export default LoggedOutView
