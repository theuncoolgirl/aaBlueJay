const LOAD_ALL_COINS = "bluejay/coin/LOAD_ALL_COINS"

const loadAllCoins = (coins) => ({type: LOAD_ALL_COINS, coins})

export const load_coin_names = () => async dispatch => {
    const res = await fetch(`/api/coins/names`)
    if (res.ok) {
        const coins = await res.json()
        dispatch(loadAllCoins(coins))
      }
}


export default function reducer(state=[], action) {
    switch (action.type) {
        case LOAD_ALL_COINS:
            return action.coins.coin_names
        default:
            return state;
    }
};
