import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import errorReset from '../../redux/actions/authentication/errorReset.js';
import loginStarted from '../../redux/actions/authentication/loginStarted.js';
import registrationStarted from '../../redux/actions/authentication/registrationStarted.js';
import { motion } from 'framer-motion';
import InlineLoading from '../InlineLoading';
import styles from './AuthenticationForm.module.scss';
import modalWindowForgotPasswordAction from '../../redux/actions/modalWindow/openModalWindowForgotPassword';
import ModalWindowForgotPassword from '../modalWindowForgotPassword';

const AuthenticationForm = ({ mode }) => {
  const isError = useSelector(state => state.user.error);
  const errorText = useSelector(state => state.user.errorText);
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.isForgotPasswordModal.isOpened);
  const [isLoading, setIsLoading] = useState(false);
  const initialInput = {
    firstName: '',
    lastName: '',
    login: '',
    password: '',
    repPassword: '',
    email: '',
  };
  const [input, setInput] = useState(initialInput);
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
      <ModalWindowForgotPassword show={isOpen} />
      <form
        onSubmit={event => loginHandler(event)}
        className={styles.inputField}
      >
        <div>
          {isError && (
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{errorText}</p>
            </div>
          )}
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
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setInput(prevState => ({ ...prevState, ...initialInput }));
            dispatch(errorReset());
          }}
        >
          <Link to={'/registration'} className={styles.registrationLink}>
            У меня ещё нет аккаунта
          </Link>
        </motion.div>
        <motion.button
          className={styles.forgot}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            dispatch(modalWindowForgotPasswordAction());
          }}
        >
          Забыли пароль?
        </motion.button>
      </div>
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
      <motion.div
        className={styles.afterbutton}
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          setInput(prevState => ({ ...prevState, ...initialInput }));
          dispatch(errorReset());
        }}
      >
        <Link to={'/login'} className={styles.registrationLink}>
          У меня уже есть аккаунт
        </Link>
      </motion.div>
    </div>
  ) : (
    <></>
  );
};

export default AuthenticationForm;

// TODO: введенное значнеие меняет цвет, переменные инпута сделать уникальными для лог и рег
