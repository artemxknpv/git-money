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
      <h4 className={styles.categoryHeader}>Расходы</h4>
      <div className={styles.container}>
        {expenditures &&
          expenditures.map((expense, index) => {
            return (
              <Droppable key={index} droppableId={expense.id}>
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
