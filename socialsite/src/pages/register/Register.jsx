import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../proxySettings';
import styles from './Register.module.css';

const Register = () => {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity('password dont match');
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };
      try {
        await axiosInstance.post('/auth/register', user);
        navigate('/');
      } catch (error) {}
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Finjana</h3>
          <span className={styles.loginDesc}>
            Connect with Friends and the world around you on Finjana
          </span>
        </div>
        <div className={styles.loginRight}>
          <form onSubmit={handleSubmit} className={styles.loginBox}>
            <input
              type="text"
              placeholder="Username"
              className={styles.loginInput}
              required
              ref={username}
            />
            <input
              type="email"
              placeholder="Email"
              className={styles.loginInput}
              required
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.loginInput}
              required
              minLength="6"
              ref={password}
            />
            <input
              type="password"
              placeholder="Password Again"
              className={styles.loginInput}
              required
              ref={passwordAgain}
            />

            <button type="submit" className={styles.registerButton}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
