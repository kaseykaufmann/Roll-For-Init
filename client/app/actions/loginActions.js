export const LOADING_ON = "LOADING_ON";
export const LOADING_OFF = "LOADING_OFF";

export const LOGIN = "LOGIN";
export const THROW_ERROR = "THROW_ERROR";

export const login = data => (dispatch, getState) => {
  dispatch({ type: LOADING_ON });

  // axios
  //   .post("/api/users/login", data)
  //   .then(() => {
  const loginInfo = {
    username: data.username,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword
  };

  dispatch({ type: LOGIN, payload: loginInfo });
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
