import React, { useContext, useRef } from 'react';
import styles from './Login.module.css';
import { loginCall } from '../../apicalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

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
          <div className={styles.loginDesc}>
            Connect with Friends and the world
          </div>
          <div className={styles.loginDesc2}>Logon to Finjana</div>
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
            <span className={styles.forgotPassword}>
              {
                "Login with username: jane@test.com, password:123456 \n \n login as jane's friend like so username:{friend's name}@test.com, password:123456 "
              }
            </span>
            <button className={styles.registerButton}>
              Create New Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
