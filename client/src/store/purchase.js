import { updateBank } from './session'

const LOAD_ALL_PURCHASES = 'bluejay/purchase/LOAD_ALL_PURCHASES'
const ADD_PURCHASE_HISTORY = 'bluejay/purchase/ADD_PURCHASE_HISTORY'

//action creators
const loadAll = (purchases) => {
  return {
    type: LOAD_ALL_PURCHASES,
    purchases: purchases.purchases
  }
}

const addHistory = (purchase) => {
  return {
    type: ADD_PURCHASE_HISTORY,
    purchase
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

export const addPurchaseHistory = (userId, tickerSymbol, purchasePrice, purchaseQuantity) => async dispatch => {
  const body = {
    userId,
    purchasePrice,
    purchaseQuantity,
    tickerSymbol
  }

  console.log('in add purchase', purchaseQuantity, purchasePrice)
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

    const { purchase, cash } = await res.json()
    console.log('cash',cash)
    console.log('update', updateBank)
    //update bank in store after buy/sell
    dispatch(updateBank(cash))
    //update purchase history in store
    dispatch(addHistory(purchase))

  } catch (e) {
    console.log(e)
  }
}

//reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case LOAD_ALL_PURCHASES:
      return action.purchases;
    case ADD_PURCHASE_HISTORY:
      return [...state, action.purchase]
    default:
      return state;
  }
}
