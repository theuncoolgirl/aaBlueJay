const LOAD_ALL_PURCHASES = 'bluejay/purchase/LOAD_ALL_PURCHASES'
const ADD_PURCHASE = 'bluejay/purchase/ADD_PURCHASE'
const DELETE_PURCHASE = 'bluejay/purchase/DELETE_PURCHASE'

//action creators
const loadAll = (purchases) => {
  return {
    type: LOAD_ALL_PURCHASES,
    purchases: purchases.purchases
  }
}

const buy = (purchase) => {
  return {
    type: ADD_PURCHASE,
    purchase
  }
}

const removePurchase = () => {
  return {
    type: DELETE_PURCHASE
  }
}


//thunks
export const load_purchase_history = (id) => async dispatch => {
  const res = await fetch(`/api/users/purchases/${id}`)
  if (res.ok) {
    const history = await res.json()
    dispatch(loadAll(history))
  }
}

export const addPurchase = (userId, purchasePrice, purchaseQuantity) => async dispatch => {
  const body = {
    userId,
    purchasePrice,
    purchaseQuantity
  }
  console.log('in add purchase')
  try {
    const res = await fetch('/api/users/purchases/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      throw res
    }

    const { purchase } = await res.json()
    dispatch(buy(purchase))
  } catch (e) {
    console.log(e)
  }
}

export const deletePurchase = (userId, purchaseId) => async dispatch => {
  const body = {
    userId,
  }

  try {
    const res = await fetch(`/api/users/purchases/${purchaseId}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      throw res
    }

    const { purchase } = await res.json()
    dispatch(removePurchase(purchase))
  } catch (e) {
    console.log(e)
  }
}


//reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case LOAD_ALL_PURCHASES:
      return action.purchases;
    case ADD_PURCHASE:
      return [...state, action.purchase]
    default:
      return state;
  }
}
