import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
<<<<<<< HEAD
import session from './session';
import explore from './explore'
=======
import session from "./session";
import coin from "./coin";
import explore from './explore';

>>>>>>> 1d688f5a0327caeea4dcaeb3324e1e45a2e655b5
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  session,
<<<<<<< HEAD
  explore
=======
  explore,
  coin
>>>>>>> 1d688f5a0327caeea4dcaeb3324e1e45a2e655b5
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
