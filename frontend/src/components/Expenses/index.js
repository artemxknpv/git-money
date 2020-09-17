import React from 'react';
import AddCategory from '../AddCategory';
import StoreCategory from '../StoreCategory';
import styles from './Expenses.module.css';

function Expenses() {
  return (
    <div className={styles.expenses}>
      <h4>Расходы</h4>
      <div className={styles.items_container}>
        <StoreCategory type='expenses' name='Продукты' />
        <StoreCategory type='expenses' name='Кафе и рестораны' />
        <AddCategory />
      </div>
    </div>
  );
}

export default Expenses;
