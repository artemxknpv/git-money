import React from 'react';
import { useSelector } from 'react-redux';
import AddCategory from '../AddCategory';
import Category from '../Category';
import styles from './Expenses.module.css';

const Expenses = () => {
  const expenditures = useSelector(state =>
    state.user.categories.filter(category => category.value === 'expenditure')
  );
  return (
    <div className={styles.expenses}>
      <h4>Расходы</h4>
      <div className={styles.items_container}>
        {expenditures &&
          expenditures.map(expense => {
            return (
              <Category
                type="expenses"
                key={expense.id}
                count={expense.currentNumber}
                name={expense.name}
              />
            );
          })}
        <AddCategory type="expenses" />
      </div>
    </div>
  );
};

export default Expenses;
