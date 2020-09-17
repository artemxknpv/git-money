import React from 'react';
import Expenses from '../../components/Expenses';
import Income from '../../components/Income';
import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <Income />
      <hr />
      <Expenses />
    </div>
  );
};

export default MainPage;
