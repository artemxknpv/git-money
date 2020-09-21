import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import errorReset from '../../redux/actions/authentication/errorReset.js';
import loginStarted from '../../redux/actions/authentication/loginStarted.js';
import registrationStarted from '../../redux/actions/authentication/registrationStarted.js';

import styles from './AuthenticationForm.module.scss';

const AuthenticationForm = ({ mode }) => {
  const isError = useSelector(state => state.user.error);
  const errorText = useSelector(state => state.user.errorText);
  const dispatch = useDispatch();

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
  }, []);

  const changeHandler = ({ target: { name, value } }) => {
    console.log(name, value);
    setInput({
      ...input,
      [name]: value,
    });
  };

  const loginHandler = event => {
    event.preventDefault();
    dispatch(loginStarted(login, password));
  };

  const registerHandler = event => {
    event.preventDefault();
    console.log(email, login, password);
    dispatch(registrationStarted(firstName, lastName, email, login, password));
  };

  return mode === 'login' ? (
    <div>
      {isError && <p>{errorText}</p>}
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
        <button type="submit" className={styles.btn}>
          Войти
        </button>
      </form>
      <div className={styles.afterbutton}>
        <Link to={'/registration'} className={styles.registrationLink}>
          У меня ещё нет аккаунта
        </Link>
        <p className={styles.forget}>Забыли пароль?</p>
      </div>
    </div>
  ) : mode === 'registration' ? (
    <div>
      <form onSubmit={registerHandler} className={styles.inputField}>
        {isError && errorText}
        <input
          type="text"
          placeholder="Василий"
          value={firstName}
          name="firstName"
          onChange={changeHandler}
          className={styles.inp}
        />
        <input
          type="text"
          placeholder="Васильев"
          value={lastName}
          name="lastName"
          onChange={changeHandler}
          className={styles.inp}
        />
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
          type="email"
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
        <button className={styles.btn}>Зарегистрироваться</button>
      </form>
      <div className={styles.afterbutton}>
        <Link to={'/login'} className={styles.registrationLink}>
          У уже есть аккаунт
        </Link>
        <p className={styles.forget}>Забыли пароль?</p>
      </div>
    </div>
  ) : (
    <>лох</>
  );
};

export default AuthenticationForm;

// TODO: введенное значнеие меняет цвет, переменные инпута сделать уникальными для лог и рег
