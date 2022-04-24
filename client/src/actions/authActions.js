import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_CUSTOMER,
  CUSTOMER_LOADING
} from "./types";
// Register User
export const registerCustomer = (customerData, history) => dispatch => {
  axios
    .post("/api/customer/register", customerData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginCustomer = customerData => dispatch => {
  axios
    .post("/api/customer/login", customerData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentCustomer(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentCustomer = decoded => {
  return {
    type: SET_CURRENT_CUSTOMER,
    payload: decoded
  };
};
// User loading
export const setCustomerLoading = () => {
  return {
    type: CUSTOMER_LOADING
  };
};
// Log user out
export const logoutCustomer = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentCustomer({}));
};