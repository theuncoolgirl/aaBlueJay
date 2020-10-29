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
import { makeStyles } from '@material-ui/core/styles';
import PurchaseHistory from './components/PurchaseHistory'

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(40),
        height: theme.spacing(50),
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      }
  }));

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
        <BrowserRouter>
            <PurchaseHistory/>
            <LoginForm />
            <SearchBar />
            <NavLink to="/friends">Friends</NavLink>
            <div className={classes.root}>
                <Paper elevation={2}>
                    <div className='buying-power'>
                        <BuyingPower />
                    </div>
                </Paper>
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/" activeclass="active"><img src="logo.png" height={'50px'}/></NavLink></li>
                    <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                    <li><NavLink to="/explore/1" activeclass="active">Explore</NavLink></li>
                    <li><NavLink to="/list/watchlist" activeclass="active">Watchlist</NavLink></li>
                    <li><NavLink to="/coins/litecoin" activeclass="active">coins</NavLink></li>
                </ul>
                <LogoutButton />
            </nav>
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
                <Route path="/">
                    <h1>My Home Page</h1>
                </Route>
                <Route path="/404">
                    <h1>No Results found, please try again</h1>
                </Route>
            </Switch>
        </BrowserRouter >
    );
}

export default App;
