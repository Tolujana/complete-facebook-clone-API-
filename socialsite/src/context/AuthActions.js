export const LoginStart = (userCredential) => {
  {
    type: "LOGIN_START";
  }
};
export const LoginSuccess = (userInfo) => ({
  type: "LOGIN_SUCCESS",
  payload: userInfo,
});

export const LoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
