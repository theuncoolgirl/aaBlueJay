const LOAD_ALL_COINS = "bluejay/coin/LOAD_ALL_COINS"
const LOAD_CURRENT_RESULTS = "bluejay/coin/LOAD_CURRENT_RESULTS"

const loadAllCoins = (coins) => ({type: LOAD_ALL_COINS, coins})
const loadCurRes = (results) => ({type: LOAD_CURRENT_RESULTS, results})

export const load_coin_names = () => async dispatch => {
    const res = await fetch(`/api/coins/names`)
    if (res.ok) {
        const coins = await res.json()
        dispatch(loadAllCoins(coins))
      }
}

export const loadCurrentResults = (results) => async dispatch => {
    dispatch(loadCurRes(results))
}

export default function reducer(state={'currentResults': [], 'allCoins': []}, action) {
    let newState;
    switch (action.type) {
        case LOAD_ALL_COINS:
            newState = {...state}
            newState.allCoins = [...action.coins.coin_names]
            return newState
        case LOAD_CURRENT_RESULTS:
            newState = {...state}
            newState.currentResults = [...action.results]
            return newState
        default:
            return state;
    }
};
