import * as actionTypes from "./types";


// Auth
export const login_failed = (payload) => ({
  type: actionTypes.LOGIN_FAIL,
  payload,
});
export const login_success = (payload) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload,
});
export const load_user = (payload) => ({
  type: actionTypes.USER_LOADED,
  payload,
});
export const auth_error = () => ({
  type: actionTypes.AUTH_ERROR,
});
export const logout = () => ({
  type: actionTypes.LOGOUT,
});

// Accounts
export const add_account = (payload) => ({
  type: actionTypes.ADD_ACCOUNT,
  payload,
});
export const get_accounts = (payload) => ({
  type: actionTypes.GET_ACCOUNTS,
  payload,
});
export const delete_account = (payload) => ({
  type: actionTypes.DELETE_ACCOUNT,
  payload,
});
export const update_account = (payload) => ({
  type: actionTypes.UPDATE_ACCOUNT,
  payload,
});


// Accounts
export const add_transaction = (payload) => ({
  type: actionTypes.ADD_TRANSACTION,
  payload,
});
export const get_transactions = (payload) => ({
  type: actionTypes.GET_TRANSACTIONS,
  payload,
});
export const delete_transaction = (payload) => ({
  type: actionTypes.DELETE_TRANSACTION,
  payload,
});
export const update_transaction = (payload) => ({
  type: actionTypes.UPDATE_TRANSACTION,
  payload,
});