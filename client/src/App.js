import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserList from './components/UsersList';
import MyList from './components/WatchList'
import SignUpForm from './components/SignUpForm';
import CoinDetails from './components/CoinDetails';
import ExploreCurrencies from './components/ExploreCurrencies'
import * as AuthAction from './store/session';
import { load_coin_names } from './store/search_coins'
import SearchResults from './components/SearchResults'
import FriendList from './components/FriendList'
import { thunks } from './store/list';
import DisplayLists from './components/DisplayLists'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import { Container } from '@material-ui/core';
import LoggedOutView from './components/LoggedOutView'

function App() {

    const dispatch = useDispatch()
    const loaduser = () => dispatch(AuthAction.loadUser())
    const load_all_coins = () => dispatch(load_coin_names())
    const id = useSelector(state => state.session.id);

    useEffect(() => {
        loaduser()
        load_all_coins()
        dispatch(thunks.getAllUserLists(id));
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {!id && <LoggedOutView />}
            {id && (<BrowserRouter>
                <Navigation />
                <Container maxWidth="xl" style={{ justifyContent: 'space-around', display: 'flex', marginTop: 40 }}>
                    <Container maxWidth="lg" style={{ marginTop: 40 }}>
                        <Switch>
                            <Route exact={true} path="/">
                                <DisplayLists />
                            </Route>
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
                            <Route exact path="/list/:listName">
                                <MyList />
                            </Route>
                            <Route exact path="/coins/:coinId" render={props => <CoinDetails {...props} />} />
                            <Route path="/404">
                                <NotFound />
                            </Route>
                        </Switch>
                    </Container>
                    {/* <DisplayLists /> */}
                </Container>
            </BrowserRouter >)
            }
        </>
    );
}

export default App;
