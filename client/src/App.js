import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import UserList from './components/UsersList';
import LoginForm from './components/LoginForm'
import MyList from './components/WatchList'

function App() {


    return (
        <BrowserRouter>
            <LoginForm />
            <nav>
                <ul>
                    <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>

                <Route path="/list/watchlist">
                    <MyList />
                </Route>
                <Route path="/">
                    <h1>My Home Page</h1>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
