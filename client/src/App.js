import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserList from './components/UsersList';
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import * as AuthAction from './store/session';
import LogoutButton from './components/LogoutButton';


function App() {

    const dispatch = useDispatch()
    const loaduser = () => dispatch(AuthAction.loadUser())

    useEffect(()=>{
        loaduser()
    // eslint-disable-next-line
    }, [])

  return (
    <BrowserRouter>
        <nav>
            <ul>
                <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                <li><LoginForm /></li>
                <LogoutButton />
            </ul>
        </nav>
        <Switch>
            <Route path="/users">
                <UserList />
            </Route>

            <Route path="/signup">
                <SignUpForm />
            </Route>

            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
