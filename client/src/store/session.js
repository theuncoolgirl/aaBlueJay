// import Cookies from "js-cookie";

const SET_USER = "bluejay/authentication/SET_USER";
const REMOVE_USER = "bluejay/authentication/REMOVE_USER";
const LOAD_USER = "bluejay/authentication/LOAD_USER"

export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

export const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

export const load_user = (user) => {
  return {
    type: LOAD_USER,
    user
  }
}

export const login = (email, password) => {
    return async dispatch => {
      const XSRFTOKEN = await fetch('/api/users/get_csrf')
      const token = (await XSRFTOKEN.json())

      const response = await fetch(`/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken':token.csrfT
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user  = await response.json();
        dispatch(setUser(user));
      }
    };
  };


export const signup = (firstname, lastname, username, email, password, confirmpassword) => async dispatch => {
    const XSRFTOKEN = await fetch('/api/users/get_csrf')
    const token = (await XSRFTOKEN.json())

    const response = await fetch(`/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken':token.csrfT
      },
      body: JSON.stringify({firstname, lastname, username, email, password, confirmpassword})
    });

    if (response.ok) {
      const user = await response.json();
      dispatch(setUser(user));
    }
}

export const logout = () => async dispatch => {

  const XSRFTOKEN = await fetch('/api/auth/getToken')
  const token = (await XSRFTOKEN.json())

  const res = await fetch('/api/auth/logout', {
    method: "delete",
    headers: {
      'X-CSRFToken':token.XSRFTOKEN
    },
  });
  if (res.ok) {
    dispatch(removeUser());
  }
}

export const loadUser = () => async dispatch => {
  const res = await fetch('/api/users/load')
  if (res.ok) {
    const user = await res.json()
    dispatch(load_user(user))
  }
}

export default function reducer(state={}, action) {
  switch (action.type) {
    case LOAD_USER:
      return action.user
    case SET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      console.log('im here')
      return state;
  }
}
