import React from 'react'

const LoggedOutView = () => {
return(

<BrowserRouter>
    <LoginForm />
    <h2>Explore the world of crypto currencies.</h2>
    <p>Everyone has heard of bitcoin, but did you know there are so many more? Sign up to explore all of the crypto currencies out there! You might even find some suprising ones like <a href="https://dogecoin.com/">Dogecoin</a>.</p>
    <Switch>
        <Route path="/signup">
            <SignUpForm />
        </Route>
    </Switch>
</BrowserRouter>
)
}

export default LoggedOutView
