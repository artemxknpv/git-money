import React from 'react';
import AuthenticationForm from '../../components/AuthenticationForm';
import Header from '../../components/Header';
import styles from  './Authenticationpage.module.scss'

const Authentication = ({ mode }) => {
  return (
    <>
      <Header title={mode === 'register' ? 'Регистрация' : 'Войти в систему'} />
      <p className={styles.headerDesc}>
        Для использования приложения нужно авторизоваться. Войдите или
        зарегистрируйтесь.
      </p>
      <AuthenticationForm mode={mode} />
    </>
  );
};

export default Authentication;
