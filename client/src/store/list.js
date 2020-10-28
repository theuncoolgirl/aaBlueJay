const GET_USER_WATCHLIST = 'bluejay/list/GET_USER_WATCHLIST'

const updateUserWatchlist = value => ({ type: GET_USER_WATCHLIST, value })

export const actions = {
  updateUserWatchlist
};

// const userId = getState().auth.user._id;

const getUserWatchlist = (userId) => async (dispatch, getState) => {
  // will hit reducer
  // const userId = useSelecter((state) => state.session.id);
  // const dummyWatchList = ["bitcoin", "ethereum"]
  console.log("ID:", userId)
  // dispatch(setItemsLoading());
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



export const thunks = {
  getUserWatchlist
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
