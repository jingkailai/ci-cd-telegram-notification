import * as actions from "../Actions/actions";
import { baseUrl } from "../shared";

export const login = (cred, cb) => (dispatch) => {
  console.log("calling Login");
  baseUrl
    .post("/users/login", cred)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch(actions.login_success(res.data));
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
      err.response && dispatch(actions.login_failed(err.response.data.message));
    });
};
export const signup = (cred, cb) => (dispatch) => {
  baseUrl
    .post("/users", cred)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        cb(cred);
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
      err.response && dispatch(actions.login_failed(err.response.data.message));
    });
};

export const LoadUser = () => (dispatch) => {
  baseUrl
    .get("/users/verify-token")
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch(actions.load_user(res.data));
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(actions.auth_error());
    });
};
export const Logout = () => (dispatch) => {
  console.log("logout dispatched");
  dispatch(actions.logout());
};
