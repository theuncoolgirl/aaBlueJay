import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import session from "./session";
import coin from "./coin";
import explore from './explore';
import list from './list'
import search from './search_coins'
import purchase from './purchase'
import friends from './friends'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  session,
  explore,
  coin,
  list,
  search,
  purchase,
  friends
});

const storeEnhancer = composeEnhancers(applyMiddleware(thunk));

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    storeEnhancer
  );
};

export default configureStore;
