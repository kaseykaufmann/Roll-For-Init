import { LOADING_ON, LOADING_OFF, SIGN_UP, THROW_ERROR } from "../actions";

export const signUp = (
  state = {
    loading: false,
    signedUp: false,
    data: null,
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

    case SIGN_UP:
      console.log(action);
      return {
        ...state,
        data: action
      };

    case THROW_ERROR:
      console.log(action);
      return {
        ...state,
        error: action
      };

    default:
      return state;
  }
};
