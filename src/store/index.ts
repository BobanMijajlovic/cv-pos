import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

/** Reducers */
import fiscal from './Fiscal';
import application from './Application';
import receipt from './Receipt';
import client from './Client';
import lpfr from './lpfr';

const reducer = combineReducers({
  fiscal,
  application,
  receipt,
  client,
  lpfr,
});

/** Applying middleware */
const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);
export default store;
