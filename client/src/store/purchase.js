const LOAD_ALL_PURCHASES = 'bluejay/purchase/LOAD_ALL_PURCHASES'

const loadAll = (purchases) => {
    return {
        type: LOAD_ALL_PURCHASES,
        purchases
    }
}

export const load_purchase_history = (id) => async dispatch => {
    const res = await fetch(`/api/users/purchases/${id}`)
    if (res.ok) {
        const history = await res.json()
        dispatch(loadAll(history))
      }
}

export default function reducer(state=[], action) {
    switch (action.type) {
      case LOAD_ALL_PURCHASES:
        return action.purchases;
      default:
        return state;
    }
  }
