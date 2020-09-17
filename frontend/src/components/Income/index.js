import React from 'react';
import StoreCategory from '../StoreCategory';
import AddCategory from '../AddCategory';
import styles from './Income.module.css';

function Income() {
  return (
    <div className={styles.income}>
      <h4>Доходы</h4>
      <div className={styles.items_container}>
        <StoreCategory type='income' name='Наличка' />
        <StoreCategory type='income' name='Банковский счет' />
        <AddCategory />
      </div>
    </div>
  );
}

export default Income;
