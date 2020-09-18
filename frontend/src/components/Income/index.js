import React from 'react';
import { useSelector } from 'react-redux';
import Category from '../Category';
import AddCategory from '../AddCategory';
import styles from './Income.module.scss';

const Income = () => {
  const incomes = useSelector(state =>
    state.categories.filter(category => category.value === 'store')
  );
  return (
    <div className={styles.wrapper}>
      <h4
        style={{
          marginLeft: '16px',
          fontWeight: '900',
          fontSize: '1.5rem',
          color: '#333',
        }}
      >
        Доходы
      </h4>
      <div className={styles.container}>
        {incomes &&
          incomes.map(income => {
//             return <Category value="store" id={income.id} key={income.id} />;
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
