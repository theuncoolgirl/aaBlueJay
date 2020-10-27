const load_all = 'bluejay/explore/load_all'

export const loadAll = (currencies) => {
    return {
        type: load_all,
        currencies
    }
}

export const explore_all_load = (id) => async dispatch => {
    const res = await fetch(`/api/coins/explore/${id}`)
    if (res.ok) {
        const currencies = await res.json()
        dispatch(loadAll(currencies))
      }
}

export default function reducer(state=[], action) {
    switch (action.type) {
      case load_all:
        return action.currencies.coins;
      default:
        return state;
    }
  }
