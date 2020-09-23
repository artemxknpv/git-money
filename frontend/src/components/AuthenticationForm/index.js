import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import errorReset from '../../redux/actions/authentication/errorReset.js';
import loginStarted from '../../redux/actions/authentication/loginStarted.js';
import registrationStarted from '../../redux/actions/authentication/registrationStarted.js';
import { motion } from 'framer-motion';
import InlineLoading from '../InlineLoading';
import styles from './AuthenticationForm.module.scss';

const AuthenticationForm = ({ mode }) => {
  const isError = useSelector(state => state.user.error);
  const errorText = useSelector(state => state.user.errorText);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    login: '',
    password: '',
    repPassword: '',
    email: '',
  });
  const [showPassword] = useState(false); // TODO
  const { firstName, lastName, login, password, email, repPassword } = input;

  useEffect(() => {
    dispatch(errorReset());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(false);
  }, [isError]);

  const changeHandler = ({ target: { name, value } }) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const loginHandler = event => {
    event.preventDefault();
    dispatch(errorReset());
    dispatch(loginStarted(login, password));
    setIsLoading(true);
  };

  const registerHandler = event => {
    event.preventDefault();
    dispatch(errorReset());
    dispatch(
      registrationStarted(
        firstName,
        lastName,
        email,
        login,
        password,
        repPassword
      )
    );
    setIsLoading(true);
  };

  return mode === 'login' ? (
    <div>
      {/*TODO*/}
      <form
        onSubmit={event => loginHandler(event)}
        className={styles.inputField}
      >
        <div>
          <input
            type="text"
            name="login"
            value={login}
            onChange={changeHandler}
            className={styles.inp}
          />
          <span className={styles.label}>Логин</span>
        </div>
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={changeHandler}
            value={password}
            name="password"
            className={styles.inp}
          />
          <span className={styles.label}>Пароль</span>
        </div>
        <motion.button
          type="submit"
          className={!isLoading ? styles.btn : styles.disabledBtn}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? <i>{<InlineLoading loading={true} />}</i> : 'Войти'}
        </motion.button>
      </form>
      <div className={styles.afterbutton}>
        <Link to={'/registration'} className={styles.registrationLink}>
          У меня ещё нет аккаунта
        </Link>
        <p className={styles.forget}>Забыли пароль?</p>
      </div>
      {isError && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{errorText}</p>
        </div>
      )}
    </div>
  ) : mode === 'registration' ? (
    <div>
      {isError && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{errorText}</p>
        </div>
      )}
      <form onSubmit={registerHandler} className={styles.inputField}>
        <div>
          <input
            type="text"
            value={firstName}
            name="firstName"
            onChange={changeHandler}
            className={styles.inp}
          />
          <span className={styles.label}>Имя</span>
        </div>
        <div>
          <input
            type="text"
            value={lastName}
            name="lastName"
            onChange={changeHandler}
            className={styles.inp}
          />
          <span className={styles.label}>Фамилия</span>
        </div>
        <div>
          <input
            type="text"
            value={login}
            name="login"
            onChange={changeHandler}
            className={styles.inp}
          />
          <span className={styles.label}>Логин</span>
        </div>
        <div>
          <input
            // type="email"
            name="email"
            value={email}
            onChange={changeHandler}
            className={styles.inp}
          />
          <span className={styles.label}>Адрес эл. почты</span>
        </div>
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={changeHandler}
            value={password}
            name="password"
            className={styles.inp}
          />
          <span className={styles.label}>Пароль</span>
        </div>
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={changeHandler}
            value={repPassword}
            name="repPassword"
            className={styles.inp}
          />
          <span className={styles.label}>Повторите пароль</span>
        </div>
        <motion.button
          disabled={isLoading}
          className={isLoading ? styles.disabledBtn : styles.btn}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <i>{<InlineLoading loading={true} />}</i>
          ) : (
            'Зарегистрироваться'
          )}
        </motion.button>
      </form>
      <div className={styles.afterbutton}>
        <Link to={'/login'} className={styles.registrationLink}>
          У уже есть аккаунт
        </Link>
        <p className={styles.forget}>Забыли пароль?</p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AuthenticationForm;

// TODO: введенное значнеие меняет цвет, переменные инпута сделать уникальными для лог и рег
