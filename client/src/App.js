import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserList from './components/UsersList';
import LoginForm from './components/LoginForm'
import MyList from './components/WatchList'
import LogoutButton from './components/LogoutButton';
// import SignUpForm from './components/SignUpForm';
import CoinDetails from './components/CoinDetails';
import * as AuthAction from './store/session';



function App() {

    const dispatch = useDispatch()
    const loaduser = () => dispatch(AuthAction.loadUser())

    useEffect(() => {
        loaduser()
        // eslint-disable-next-line
    }, [])

    return (
        <BrowserRouter>
            <LoginForm />
            <nav>
                <ul>
                    <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                </ul>
                <LogoutButton />
            </nav>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path="/list/watchlist">
                    <MyList />
                </Route>
                <Route exact path="/coins/:coinId" render={props => <CoinDetails {...props} />} />
                <Route path="/">
                    <h1>My Home Page</h1>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
