import React from 'react';
import Category from '../Category';
import AddCategory from '../AddCategory';
import styles from './Income.module.css';

const Income = () => {
  return (
    <div className={styles.income}>
      <h4>Доходы</h4>
      <div className={styles.items_container}>
        <Category type="income" name="Наличка" />
        <Category type="income" name="Банковский счет" />
        <AddCategory type="income" />
      </div>
    </div>
  );
};

export default Income;
