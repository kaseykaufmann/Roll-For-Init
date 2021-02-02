import { combineReducers } from "redux";
import { signUp } from "./signUp";

export const rootReducer = combineReducers({
  signUp: signUp
});
