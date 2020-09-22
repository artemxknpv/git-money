import React from 'react';
import AuthenticationForm from '../../components/AuthenticationForm';
import Header from '../../components/Header';
import styles from './Authenticationpage.module.scss';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Particles from "../../components/Particles";

const Authentication = ({ mode }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return isAuthenticated ? (
    <Redirect to={'/'} />
  ) : (
    <>
    <Particles />
    <div className={styles.container}>

      <Header
        title={mode === 'registration' ? 'Регистрация' : 'Войти в систему'}
      />
      <p className={styles.headerDesc}>
        Для использования приложения нужно авторизоваться. Войдите или
        зарегистрируйтесь.
      </p>
      <AuthenticationForm mode={mode} />
    </div>
      </>
  );
};

export default Authentication;
