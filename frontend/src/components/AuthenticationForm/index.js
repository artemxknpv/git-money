import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import loginStarted from '../../redux/actions/authentication/loginStarted.js';
import styles from './AuthenticationForm.module.scss';
const AuthenticationForm = ({ mode }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    login: '',
    password: '',
    repPassword: '',
    email: '',
  });
  const [showPassword, setShowPassword] = useState(false); // TODO
  const { login, password, email, repPassword } = input;

  const changeHandler = ({ target: { name, value } }) => {
    console.log(name, value);
    setInput({
      ...input,
      [name]: value,
    });
    console.log(input);
  };

  const loginHandler = event => {
    event.preventDefault();
    console.log(login, password);
    dispatch(loginStarted(login, password));
  };

  const registerHandler = event => {
    event.preventDefault();
    // dispatch(registerStarted(login, password, email));
    console.log('Я тебя не уважаю.');
  };

  return mode === 'login' ? (
    <div>
      <form
        onSubmit={event => loginHandler(event)}
        className={styles.inputField}
      >
        <input
          type="text"
          placeholder="Логин"
          name="login"
          value={login}
          onChange={changeHandler}
          className={styles.inp}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={changeHandler}
          value={password}
          name="password"
          placeholder="Пароль"
          className={styles.inp}
        />
        <button type="submit" className={styles.btn}>
          Войти
        </button>
      </form>
      <div className={styles.afterbutton}>
        <Link to={'/register'} className={styles.registrationLink}>
          У меня ещё нет аккаунта
        </Link>
        <p className={styles.forget}>Забыли пароль?</p>
      </div>
    </div>
  ) : mode === 'register' ? (
    <div>
      <form onSubmit={registerHandler} className={styles.inputField}>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          name="login"
          onChange={changeHandler}
          className={styles.inp}
        />
        <input
          type="email"
          name="email"
          placeholder="Адрес эл. почты"
          value={email}
          onChange={changeHandler}
          className={styles.inp}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={changeHandler}
          value={password}
          name="password"
          placeholder="Пароль"
          className={styles.inp}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={changeHandler}
          value={repPassword}
          name="repPassword"
          placeholder="Повторите пароль"
          className={styles.inp}
        />
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
