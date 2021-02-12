import { LOADING_ON, LOADING_OFF, SIGN_UP, THROW_ERROR } from "../actions";

export const signUp = (
  state = {
    loading: false,
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
      return {
        ...state,
        data: action.payload
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
