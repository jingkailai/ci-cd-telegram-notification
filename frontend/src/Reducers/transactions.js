
import {
  ADD_TRANSACTION,
  GET_TRANSACTIONS,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION
} from "../Actions/types";

const initialState = {
  fetched: false,
  transactions: []
}


export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, payload]
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: [...payload]
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions.filter(transaction => transaction.transaction_id !== payload)]
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions.map(transaction => {
          if (transaction.transaction_id !== payload.id) {
            return transaction;
          }
          else return payload.transaction;
        })]
      };
    default:
      return state;
  }
}