import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserList from './components/UsersList';
import LoginForm from './components/LoginForm'
import MyList from './components/WatchList'
import LogoutButton from './components/LogoutButton';
import ChartComponent from './components/stockchartComponents/ChartComponent'
import SignUpForm from './components/SignUpForm';
import CoinDetails from './components/CoinDetails';
import ExploreCurrencies from './components/ExploreCurrencies'
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
                <div className='stockchart'>
                    <ChartComponent />
                </div>
            <LoginForm />
            <nav>
                <ul>
                    <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                    <li><NavLink to="/explore/1" activeclass="active">Explore</NavLink></li>
                </ul>
                <LogoutButton />
            </nav>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path="/signup">
                    <SignUpForm />
                </Route>
                <Route path="/explore/:id">
                    <ExploreCurrencies />
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
