import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS
} from "../actions/types";

const initialState = {
  data: null,
  err: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
    default:
      return state;
    case USER_LOGIN_FAIL:
      return { ...state, data: null, err: action.payload };
    case USER_LOGIN_SUCCESS:
      return { ...state, data: action.payload, err: null };
  }
};
