import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as AuthAction from '../store/session';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import useStyles from '../styles.js';

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const login = (email, password) => dispatch(AuthAction.login(email, password))
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const token = useSelector(state => state.session.id);
  const history = useHistory();

  if (token) {
    return null
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
    history.push('/')
  }

  const popDemoUser = e => {
    e.preventDefault()
    login("demo@example.com", "password")
    history.push('/')
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
    >
      <Grid item style={{ textAlign: 'center' }}>
        <Paper className={classes.formCard} elevation={3}>
          <Typography className={classes.title} variant='h5'>Log In</Typography>
          <form onSubmit={loginHandler}>
            <div>
              <TextField className={classes.inputField} id="email" label="Email" variant="outlined" size="small" value={email} onChange={updateEmail} />
            </div>
            <div>
              <TextField className={classes.inputField} id="password" type="password" label="Password" variant="outlined" size="small" value={password} onChange={updatePassword} />
            </div>
            <Button type="submit" className={classes.formButton} variant="outlined" color="primary">
              Log In
            </Button>
            <Button type="submit" className={classes.formButton} onClick={popDemoUser} variant="outlined" color="primary">
              Demo User
            </Button>
            <div className="signup-form-login">
              <Typography>Dont have an account?</Typography><NavLink to="/signup"><Typography>Sign Up</Typography></NavLink>
            </div>
          </form>
        </Paper >
      </Grid>
    </Grid>
  );
}

export default LoginForm
