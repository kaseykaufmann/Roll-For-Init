import { LOADING_ON, LOADING_OFF, THROW_ERROR, LOGIN } from "../actions";

export const login = (
  state = {
    loading: false,
    user: null,
    loggedIn: false,
    error: null
  },
  action
) => {
  switch (action.type) {
    case LOADING_ON:
      return {
        ...state,
        loading: true
      };

    case LOADING_OFF:
      return {
        ...state,
        loading: false
      };

    case LOGIN:
      return {
        ...state,
        user: action.payload
      };

    case THROW_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
