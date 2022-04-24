import {
    SET_CURRENT_CUSTOMER,
    CUSTOMER_LOADING
  } from "../actions/types";
  const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    customer: {},
    loading: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_CUSTOMER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          customer: action.payload
        };
      case CUSTOMER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }