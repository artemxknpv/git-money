import React from 'react';
import AuthenticationForm from '../../components/AuthenticationForm';
import Header from '../../components/Header';

const Authentication = ({ mode }) => {
  return (
    <>
      <Header title={mode === 'register' ? 'Регистрация' : 'Войти в систему'} />
      <p className={'subheader'}>
        Для использования приложения нужно авторизоваться. Войдите или
        зарегистрируйтесь.
      </p>
      <AuthenticationForm mode={mode} />
    </>
  );
};

export default Authentication;
