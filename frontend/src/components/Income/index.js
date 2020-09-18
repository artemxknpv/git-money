import React from 'react';
import { useSelector } from 'react-redux';
import Category from '../Category';
import AddCategory from '../AddCategory';
import styles from './Income.module.css';

const Income = () => {
  const incomes = useSelector(state =>
    state.categories.filter(category => category.value === 'store')
  );
  return (
    <div className={styles.income}>
      <h4>Доходы</h4>
      <div className={styles.items_container}>
        {incomes &&
          incomes.map(income => {
            return (
              <Category value={income.value} id={income.id} key={income.id} />
            );
          })}
        <AddCategory value="store" />
      </div>
    </div>
  );
};

export default Income;
