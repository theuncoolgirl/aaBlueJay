import {DataToCsv} from '../components/stockchartComponents/utils'
const UPDATE_COIN_ID_VALUE = "bluejay/coin/UPDATE_COIN_ID_VALUE";
const RECEIVE_COIN_DETAILS = "bluejay/coin/RECEIVE_COIN_DETAILS";

const updateCoinIdValue = value => ({ type: UPDATE_COIN_ID_VALUE, value })
const receiveCoinDetails = value => ({ type: RECEIVE_COIN_DETAILS, value })

export const actions = {
    updateCoinIdValue,
    receiveCoinDetails
};


const getCoinDetails = () => {
    return async (dispatch, getState) => {
        const { coin: { coinId, days, vs_currency } } = getState();
        const response = await fetch('/api/coins/', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coinId, days, vs_currency }),
        });
        try {
            if (response.status >= 200 && response.status < 400) {
                const data = await response.json();
                data.chart_data = DataToCsv(data.chart_data)
                dispatch(receiveCoinDetails(data))
            } else {
                console.error('Bad response');
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export const thunks = {
    getCoinDetails
}

const initialState = {
    days: 14,
    vs_currency: 'usd'
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_COIN_ID_VALUE:
            return {
                ...state,
                coinId: action.value
            };
        case RECEIVE_COIN_DETAILS:
            return {
                ...state,
                description: action.value.description,
                id: action.value.id,
                name: action.value.name,
                symbol: action.value.symbol,
                current_price_usd: action.value.current_price_usd,
                percent_change_usd: action.value.percent_change_usd,
                price_change_usd: action.value.price_change_usd,
                chart_data: action.value.chart_data
            }
        default:
            return state;
    }
};

export default reducer;
