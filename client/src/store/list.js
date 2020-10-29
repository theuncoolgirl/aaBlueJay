const GET_USER_WATCHLIST = 'bluejay/list/GET_USER_WATCHLIST'
const DELETE_LIST_ITEM = 'bluejay/list/DELETE_LIST_ITEM'
const ADD_LIST_ITEM = 'bluejay/list/ADD_LIST_ITEM'
const GET_ALL_LISTS = 'bluejay/list/GET_ALL_LISTS'

const updateUserWatchlist = value => ({ type: GET_USER_WATCHLIST, value })
const deleteListItem = value => ({ type: DELETE_LIST_ITEM, value })
const addListItem = value => ({ type: ADD_LIST_ITEM, value })
const getAllLists = value => ({ type: GET_ALL_LISTS, value })

export const actions = {
  updateUserWatchlist,
  deleteListItem,
  addListItem,
  getAllLists
};

// const userId = getState().auth.user._id;

const getUserWatchlist = (userId) => async (dispatch, getState) => {
  console.log("ID:", userId)
  let res = await fetch("/api/coins/list", {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      vs_currency: "usd",
      user_id: userId,
    }),
  })
  try {
    if (res.status >= 200 && res.status < 400) {
      const data = await res.json();
      dispatch(updateUserWatchlist(data))
      return data
    } else {
      console.error('Bad response');
    }
  } catch (e) {
    console.error("REDUX FOR LIST NOT WORKING !!!", e);
  }
};

const deleteWatchlistItem = (listId) => async dispatch => {
  let res = await fetch("/api/coins/list/delete", {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'listId': listId,
    })
  })
  if (res.status >= 200 && res.status < 400) {
    const data = await res.json();
    dispatch(deleteListItem(data))
    return data
  } else {
    console.error('Bad response');
  }
}

const addWatchlistItem = (coinSymbol, listId) => async dispatch => {
  let res = await fetch("/api/coins/list/add", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'listId': listId,
      'symbol': coinSymbol
    })
  })
  if (res.status >= 200 && res.status < 400) {
    const data = await res.json();
    // dispatch(addListItem(data))
    return data
  } else {
    console.error('Bad response');
  }
}

const getAllUserLists = (userId) => async dispatch => {
  let res = await fetch("/api/coins/list/all", {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "user_id": userId
    })
  })
  if (res.status >= 200 && res.status < 400) {
    const data = await res.json();
    dispatch(getAllLists(data))
    return data
  } else {
    console.error('Bad response');
  }
}

export const thunks = {
  getUserWatchlist,
  deleteWatchlistItem,
  addWatchlistItem,
  getAllUserLists
}

function reducer(state = { watchlist: [], lists: [] }, action) {
  let newState;
  switch (action.type) {
    case GET_USER_WATCHLIST:
      newState = Object.values(action.value)
      return {
        ...state,
        watchlist: newState
      };
    case DELETE_LIST_ITEM:
      newState = { ...state }
      const filteredList = newState.watchlist.filter(listItem => {
        return listItem.symbol !== action.value.symbol.toLowerCase()
      })
      return { watchlist: filteredList }
    // case ADD_LIST_ITEM:
    //   newState = { ...state }
    //   newState.watchlist = [...newState.watchlist, action.value.newListItem]
    //   debugger
    //   return newState
    case GET_ALL_LISTS:
      newState = { ...state }
      newState.lists = [...newState.lists, action.value.lists]
      return { lists: [...action.value.lists] }
    default:
      return state;
  }
};

export default reducer;
