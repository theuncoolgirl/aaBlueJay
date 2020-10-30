import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const LoggedOutView = () => {
return(

<BrowserRouter>
    <Container maxWidth="md" style={{ marginTop: 40 }}>
        <Switch>
            <Route path="/signup">
                    <SignUpForm />
            </Route>
            <Route exact path="*">
                    <LoginForm />
                    <h2>Explore the world of crypto currencies.</h2>
                    <p>Everyone has heard of bitcoin, but did you know there are so many more? Sign up to explore all of the crypto currencies out there! You might even find some suprising ones like <a href="https://dogecoin.com/">Dogecoin</a>.</p>
            </Route>
        </Switch>
    </Container>
</BrowserRouter>
)
}

export default LoggedOutView
