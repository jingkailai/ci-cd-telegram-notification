
import {
  ADD_ACCOUNT,
  GET_ACCOUNTS,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT
} from "../Actions/types";

const initialState = {
  fetched: false,
  accounts: []
}


export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, payload]
      };
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: [...payload]
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts.filter(account => account.account_id !== payload)]
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts.map(account => {
          if (account.account_id !== payload.id) {
            return account;
          }
          else return payload.account;
        })]
      };
    default:
      return state;
  }
}