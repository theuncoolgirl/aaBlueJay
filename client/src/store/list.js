const GET_USER_WATCHLIST = 'bluejay/list/GET_USER_WATCHLIST'
const DELETE_LIST_ITEM = 'bluejay/list/DELETE_LIST_ITEM'

const updateUserWatchlist = value => ({ type: GET_USER_WATCHLIST, value })
const deleteListItem = value => ({ type: DELETE_LIST_ITEM, value })

export const actions = {
  updateUserWatchlist,
  deleteListItem
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
    dispatch(updateUserWatchlist(data))
    return data
  } else {
    console.error('Bad response');
  }
}

export const thunks = {
  getUserWatchlist,
  deleteWatchlistItem
}

function reducer(state = { watchlist: [] }, action) {
  switch (action.type) {
    case GET_USER_WATCHLIST:
      const newState = Object.values(action.value)
      return {
        ...state,
        watchlist: newState
      };
    default:
      return state;
  }
};

export default reducer;
