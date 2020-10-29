import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, Typography } from '@material-ui/core';
import useStyles from '../styles.js';
import * as AuthAction from '../store/session';

const LogoutButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const logout = () => dispatch(AuthAction.logout());
  const loggedOut = useSelector(state => !state.session.id);
  if (loggedOut) {
    return null;
  }
  return (
    <div>
      {/* <button onClick={logout}>Logout</button> */}
      <Link onClick={logout} style={{ textDecoration: "none" }}>
        <Typography className={classes.link} underline="none" variant="caption">Logout</Typography>
      </Link>
    </div>
  );
}


export default LogoutButton