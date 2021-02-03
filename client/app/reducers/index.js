import { combineReducers } from "redux";
import { signUp } from "./signUp";
import { login } from "./login";

export const rootReducer = combineReducers({
  signUp: signUp,
  login: login
});
