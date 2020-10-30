import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as AuthAction from '../store/session';
import { Redirect, NavLink } from 'react-router-dom';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import useStyles from '../styles.js';
import ErrorContainer from './ErrorContainer'

const SignUpForm = () => {
        const classes = useStyles();
        const dispatch = useDispatch()
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [userName, setUserName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const token = useSelector(state => state.session.id);

        const signup = (firstname, lastname, username, email, password, confirmpassword) => dispatch(AuthAction.signup(firstname, lastname, username, email, password, confirmpassword))

        const SignupHandler = e => {
                e.preventDefault()
                signup(firstName, lastName, userName, email, password, confirmPassword)
        }

        if (token) {
                return <Redirect to="/" />;
        }

        return (
                <Grid
                        container
                        direction="row"
                        justify="space-around"
                >
                        <ErrorContainer />
                        <Grid item style={{ textAlign: 'center' }}>
                                <Paper className={classes.formCard} elevation={3}>
                                        <Typography className={classes.title} variant='h5'>Sign Up</Typography>
                                        <form onSubmit={SignupHandler}>
                                                <div>
                                                        <TextField className={classes.inputField} id="firstName" label="First Name" variant="outlined" size="small" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                                </div>
                                                <div>
                                                        <TextField className={classes.inputField} id="lastName" label="Last Name" variant="outlined" size="small" value={lastName} onChange={e => setLastName(e.target.value)} />
                                                </div>
                                                <div>
                                                        <TextField className={classes.inputField} id="userName" label="Username" variant="outlined" size="small" value={userName} onChange={e => setUserName(e.target.value)} />
                                                </div>
                                                <div>
                                                        <TextField className={classes.inputField} id="email" label="Email" variant="outlined" size="small" value={email} onChange={e => setEmail(e.target.value)} />
                                                </div>
                                                <div>
                                                        <TextField className={classes.inputField} id="password" type="password" label="Password" variant="outlined" size="small" value={password} onChange={e => setPassword(e.target.value)} />
                                                </div>
                                                <div>
                                                        <TextField className={classes.inputField} id="confirmPassword" name="confirmpassword" type="password" label="Confirm Password" variant="outlined" size="small" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                                </div>
                                                <Button type="submit" className={classes.formButton} variant="outlined" color="primary">
                                                        Sign Up
                                                </Button>
                                                <div className="signup-form-login">
                                                        <Typography>Already have an account?</Typography><NavLink to="/login"><Typography>Log In</Typography></NavLink>
                                                </div>
                                        </form>
                                </Paper >
                        </Grid>
                </Grid>
        );
}


export default SignUpForm
