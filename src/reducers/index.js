import { combineReducers } from "redux";

import NavReducer from "./NavReducer";
import LoginReducer from "./LoginReducer";

export default combineReducers({
  nav: NavReducer,
  login: LoginReducer
});
