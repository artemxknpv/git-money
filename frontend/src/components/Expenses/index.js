import React from 'react';
import AddCategory from '../AddCategory';
import Category from '../Category';
import styles from './Expenses.module.css';

const Expenses = () => {
  return (
    <div className={styles.expenses}>
      <h4>Расходы</h4>
      <div className={styles.items_container}>
        <Category type="expenses" name="Продукты" />
        <Category type="expenses" name="Кафе и рестораны" />
        <AddCategory type="expenses" />
      </div>
    </div>
  );
};

export default Expenses;
