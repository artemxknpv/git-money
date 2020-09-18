import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Expenses from '../../components/Expenses';
import Income from '../../components/Income';
import styles from './MainPage.module.css';

import getUserInfoStarted from '../../redux/actions/getUserInfo/getUserInfoStarted';

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoStarted());
  }, []);
  return (
    <div className={styles.container}>
      <Income />
      <hr />
      <Expenses />
    </div>
  );
};

export default MainPage;
