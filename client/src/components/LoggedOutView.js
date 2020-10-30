import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const LoggedOutView = () => {
return(

<BrowserRouter>
    <Switch>
        <Route path="/signup">
            <Container maxWidth="md" style={{ marginTop: 40 }}>
                <SignUpForm />
            </Container>
        </Route>
        <Route exact path="*">
            <Container maxWidth="md" style={{ marginTop: 40 }}>
                <LoginForm />
                <h2>Explore the world of crypto currencies.</h2>
                <p>Everyone has heard of bitcoin, but did you know there are so many more? Sign up to explore all of the crypto currencies out there! You might even find some suprising ones like <a href="https://dogecoin.com/">Dogecoin</a>.</p>
            </Container>
        </Route>
    </Switch>
</BrowserRouter>
)
}

export default LoggedOutView
