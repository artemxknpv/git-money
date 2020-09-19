import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import loginStarted from '../../redux/actions/authentication/loginStarted.js';
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
    setInput({
      ...input,
      [name]: value,
    });
  };

  const loginHandler = event => {
    event.target.preventDefault();
    dispatch(loginStarted(login, password));
  };

  const registerHandler = event => {
    event.target.preventDefault();
    // dispatch(registerStarted(login, password, email));
    console.log('Я тебя не уважаю.');
  };

  return mode === 'login' ? (
    <div>
      <form onSubmit={loginHandler}>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={changeHandler}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={changeHandler}
          value={password}
          placeholder="Пароль"
        />
        <button className={'loginButton'}>Войти</button>
      </form>
      <Link to={'/register'}>У меня ещё нет аккаунта</Link>
      <p>Забыли пароль?</p>
    </div>
  ) : mode === 'register' ? (
    <div>
      <form onSubmit={registerHandler}>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={changeHandler}
        />
        <input
          type="email"
          placeholder="Адрес эл. почты"
          value={email}
          onChange={changeHandler}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={changeHandler}
          value={password}
          placeholder="Пароль"
        />
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={changeHandler}
          value={repPassword}
          placeholder="Повторите пароль"
        />
        <button className={'loginButton'}>Зарегистрироваться</button>
      </form>
      <Link to={'/login'}>У уже есть аккаунт</Link>
      <p>Забыли пароль?</p>
    </div>
  ) : (
    <>лох</>
  );
};

export default AuthenticationForm;
