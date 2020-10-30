import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserList from './components/UsersList';
import LoginForm from './components/LoginForm'
import MyList from './components/WatchList'
import LogoutButton from './components/LogoutButton';
import SignUpForm from './components/SignUpForm';
import CoinDetails from './components/CoinDetails';
import ExploreCurrencies from './components/ExploreCurrencies'
import * as AuthAction from './store/session';
import { load_coin_names } from './store/search_coins'
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults'
import FriendList from './components/FriendList'
import BuyingPower from './components/BuyingPower'
import Paper from '@material-ui/core/Paper';
import PurchaseHistory from './components/PurchaseHistory'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import useStyles from './styles'

function App() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const loaduser = () => dispatch(AuthAction.loadUser())
    const load_all_coins = () => dispatch(load_coin_names())
    const id = useSelector(state => state.session.id);

    useEffect(() => {
        loaduser()
        load_all_coins()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {!id && <BrowserRouter>
            <LoginForm />
            <Switch>
            <Route path="/signup">
                        <SignUpForm />
            </Route>
            </Switch>
            </BrowserRouter>}
            {id && (<BrowserRouter>
                <Navigation />
                {/* <LoginForm /> */}
                <Switch>
                    <Route path="/friends">
                        <FriendList />
                    </Route>
                    <Route path="/users">
                        <UserList />
                    </Route>
                    <Route path="/results">
                        <SearchResults />
                    </Route>
                    <Route path="/signup">
                        <SignUpForm />
                    </Route>
                    <Route path="/explore/:id">
                        <ExploreCurrencies />
                    </Route>
                    <Route exact path="/list/watchlist">
                        <MyList />
                    </Route>
                    <Route exact path="/coins/:coinId" render={props => <CoinDetails {...props} />} />
                    <Route path="/404">
                        <NotFound />
                    </Route>
                    <Route exact={true} path="/">
                        <h1>My Home Page</h1>
                    </Route>
                </Switch>
            </BrowserRouter >)}
        </>
    );
}

export default App;
