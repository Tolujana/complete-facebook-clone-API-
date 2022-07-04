import React, { useContext, useRef } from 'react';
import styles from './Login.module.css';
import { loginCall } from '../../apicalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginWrapper} onSubmit={handleSubmit}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Finjana</h3>
          <span className={styles.loginDesc}>
            Connect with Friends and the world around you on Finjana
          </span>
        </div>
        <div className={styles.loginRight}>
          <div className={styles.loginBox}>
            <input
              type="email"
              placeholder="Email"
              ref={email}
              required
              className={styles.loginInput}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.loginInput}
              minLength="6"
              ref={password}
              required
            />
            <button className={styles.loginButton}>
              {isFetching ? <CircularProgress color="success" /> : 'Log In'}
            </button>
            <span className={styles.forgotPassword}>FOrgot Password?</span>
            <button className={styles.registerButton}>
              {isFetching ? (
                <CircularProgress color="success" />
              ) : (
                'Create New Account'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
