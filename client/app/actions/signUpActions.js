export const LOADING_ON = "LOADING_ON";
export const LOADING_OFF = "LOADING_OFF";

export const SIGN_UP = "SIGN_UP";
export const THROW_ERROR = "THROW_ERROR";

export const signUp = newUserData => async (dispatch, getState) => {
  dispatch({ type: LOADING_ON });
  // axios
  //   .post("/signup", newUserData)
  //   .then(() => {
  const signUpInfo = {
    username: newUserData.username,
    email: newUserData.email,
    password: newUserData.password,
    confirmPassword: newUserData.confirmPassword
  };

  dispatch({ type: SIGN_UP, signUpInfo });
  // })
  // .catch(error => {
  //   dispatch({
  //     type: AUTH_SIGNUP_END,
  //     payload: {
  //       error: axios_error(error)
  //     }
  //   });
  // });
  dispatch({ type: LOADING_OFF });
};
