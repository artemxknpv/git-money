import React from 'react';
import { useSelector } from 'react-redux';
import AddCategory from '../AddCategory';
import Category from '../Category';
import { Droppable } from 'react-beautiful-dnd';

import styles from './Expenses.module.scss';

const Expenses = () => {
  const expenditures = useSelector(state =>
    state.categories.filter(category => category.value === 'expenditure')
  );

  return (
    <div className={styles.wrapper}>
      <h4
        style={{
          fontWeight: '900',
          fontSize: '1.5rem',
          marginLeft: '16px',
          color: '#333',
        }}
      >
        Расходы
      </h4>
      <div className={styles.container}>
        {expenditures &&
          expenditures.map(expense => {
            return (
              <Droppable droppableId={expense.id}>
                {(provided, snapshot) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Category
                        value={expense.value}
                        key={expense.id}
                        id={expense.id}
                      />
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        <AddCategory value="expenditure" />
      </div>
    </div>
  );
};

export default Expenses;
