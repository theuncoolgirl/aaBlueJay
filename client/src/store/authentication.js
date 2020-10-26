import Cookies from "js-cookie";

const SET_USER = "sommWiki/authentication/SET_USER";
const REMOVE_USER = "sommWiki/authentication/REMOVE_USER";

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

export const login = (email, password) => {
    return async dispatch => {

      //genearte 2nd part of CSRF protection and save as token
    //   const XSRFTOKEN = await fetch('/api/auth/getToken')
    //   const token = (await XSRFTOKEN.json())

      //call login route w/ email and password from form
      const response = await fetch(`/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //set header to the token from above fetch call
        //   'csrf-token':token.XSRFTOKEN
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user } = await response.json();
        //if the user is successfully logged in disatch the info to update state to the user
        dispatch(setUser(user));
      }
    };
  };


export const signup = (firstName, lastName, userName,email, password) => async dispatch => {
    //genearte 2nd part of CSRF protection and save as token
    // debugger
    const XSRFTOKEN = await fetch('/api/auth/getToken')
    const token = (await XSRFTOKEN.json())

    //call signup route w/ signUp form data
    const response = await fetch(`/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //set header to the token from above fetch call
        'csrf-token':token.XSRFTOKEN
      },
      body: JSON.stringify({firstName, lastName, userName,email, password}),
    });

    if (response.ok) {
      const { user } = await response.json();
      //if the user is successfully logged in disatch the info to update state to the user
      dispatch(setUser(user));
    }
}

export const logout = () => async dispatch => {

  const XSRFTOKEN = await fetch('/api/auth/getToken')
  const token = (await XSRFTOKEN.json())

  //fetch to logout in auth route from backend api
  const res = await fetch('/api/auth/logout', {
    method: "delete",
    headers: {
      //set header to the token from above fetch call
      'csrf-token':token.XSRFTOKEN
    },
  });
  if (res.ok) {
    //if successful update state to empty object

    dispatch(removeUser());
  }
}


function loadUser() {
  //get token from browser then check if there is a browser
  const authToken = Cookies.get("token");
  if (authToken) {
    try {
      //gets the value from the cookie (index 0 is key, index 1 is the value)
      const payload = authToken.split(".")[1];

      //conversa base54 encoded binary string into an ASCII string
      const decodedPayload = atob(payload);

      //converts from json to JS object
      const payloadObj = JSON.parse(decodedPayload);
      //destructure data
      const { data } = payloadObj;
      //return user into as data (this will set the default state to the user)
      return data;
    } catch (e) {
      //any errors then remove the cookie
      Cookies.remove("token");
    }
  }
  //if no cookie set state to empty object
  return {};
}

export default function reducer(state=loadUser(), action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
