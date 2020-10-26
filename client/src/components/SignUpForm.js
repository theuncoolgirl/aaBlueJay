import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as AuthAction from '../store/session';
import { Redirect, NavLink } from 'react-router-dom';

const SignUpForm = () => {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const token = useSelector(state => state.session.id);

    const signup = (firstname, lastname, username,email, password, confirmpassword) => dispatch(AuthAction.signup(firstname, lastname, username,email, password, confirmpassword))

    const SignupHandler = e => {
        e.preventDefault()
        signup(firstName, lastName, userName,email, password, confirmPassword)
    }

    if (token) {
        return <Redirect to="/" />;
    }

    return (
            <form onSubmit={SignupHandler}>
                <input type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        />
                <input type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        />
                <input type="text"
                        placeholder="User Name"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        />
                <input type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                <input type="password"
                        placeholder="Confirm Password"
                        name="confirmpassword"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        />
                <button type="submit">Sign Up</button>
                <div>
                    <div>Already have an account?</div><NavLink to="/login"> Login</NavLink>
                </div>
            </form>
    );
}


export default SignUpForm
