const SET_USER = "bluejay/authentication/SET_USER";
const REMOVE_USER = "bluejay/authentication/REMOVE_USER";
const LOAD_USER = "bluejay/authentication/LOAD_USER"
const UPDATE_BANK = "bluejay/authentication/UPDATE_BANK"
const SET_ERRORS = "bluejay/authentication/SET_ERRORS"

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

export const updateBank = (cash) => {
  return {
    type: UPDATE_BANK,
    cash
  }
}

const setErrors = (errors) => {
  return {
    type: SET_ERRORS,
    errors
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
        'X-CSRFToken': token.csrfT
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 401) {
      let errors = await response.json()
      dispatch(setErrors(errors))
    }
    if (response.ok) {
      debugger
      const user = await response.json();
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
      'X-CSRFToken': token.csrfT
    },
    body: JSON.stringify({ firstname, lastname, username, email, password, confirmpassword })
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setUser(user));
  }
}

export const logout = () => async dispatch => {

  const XSRFTOKEN = await fetch('/api/users/get_csrf')
  const token = (await XSRFTOKEN.json())

  const res = await fetch('/api/users/logout', {
    method: "POST",
    headers: {
      'X-CSRFToken': token.csrfT
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

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {'errors': action.errors}
    case LOAD_USER:
      return action.user
    case SET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    case UPDATE_BANK:
      return Object.assign({}, state, {cash: action.cash})
    default:
      return state;
  }
}
