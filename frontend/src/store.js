import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Auth from "./Reducers/auth";
import Accounts from './Reducers/accounts';
import Transactions from './Reducers/transactions';
const midderwires = [thunk, logger];

const store = createStore(
  combineReducers({
    Auth,
    Accounts,
    Transactions,
  }),
  applyMiddleware(...midderwires)
);

export default store;
