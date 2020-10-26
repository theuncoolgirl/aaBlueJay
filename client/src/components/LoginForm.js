import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as AuthAction from '../store/session';


const LoginForm = () =>{
    const dispatch = useDispatch()
    const login = (email, password) => dispatch(AuthAction.login(email, password))
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const token = useSelector(state => state.session.id);

    if (token) {
        return <Redirect to="/" />;
    }

    const updateEmail = (e) => {
     setEmail(e.target.value)
   }

   const updatePassword = (e) => {
     setPassword(e.target.value)
   }

   const loginHandler = e => {
     e.preventDefault()
     login(email, password)
   }

    return (
      <form onSubmit={loginHandler}>
        <input type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
              />
        <input type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              />
        <button type="submit">Login</button>
        <div className="signup-form-login">
            <div>Dont have an account?</div><NavLink to="/signup"> Sign Up</NavLink>
        </div>
      </form>
      );
}

export default LoginForm
