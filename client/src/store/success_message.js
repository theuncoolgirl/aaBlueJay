const LOAD_SUCCESS_MESSAGE = 'bluejay/purchase/LOAD_SUCCESS_MESSAGE'

//action creators
export const loadSuccessMessage = (message) => {
    return {
        type: LOAD_SUCCESS_MESSAGE,
        message
    }
}

//initial state
const initialState = {
    message: null,
}

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SUCCESS_MESSAGE:
            return {
                ...state,
                message: action.message,
            }
        default:
            return state;
    }
}