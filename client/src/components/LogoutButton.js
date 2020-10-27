import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as AuthAction from '../store/session';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const logout = () => dispatch(AuthAction.logout());
    const loggedOut = useSelector(state => !state.session.id);
    if (loggedOut) {
      return null;
    }
    return (
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  export default LogoutButton
