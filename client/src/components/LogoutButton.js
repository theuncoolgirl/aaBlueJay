import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';
import useStyles from '../styles.js';
import * as AuthAction from '../store/session';

const LogoutButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const logout = () => dispatch(AuthAction.logout());
  const loggedOut = useSelector(state => !state.session.id);
  const history = useHistory();

  if (loggedOut) {
    return null;
  }

  const logoutHandler = e => {
    e.preventDefault()
    logout()
    history.push('/login')
  }


  return (
    <div>
      <Link onClick={logoutHandler} style={{ textDecoration: "none" }}>
        <Typography className={classes.link} underline="none" variant="caption">Logout</Typography>
      </Link>
    </div>
  );
}


export default LogoutButton
