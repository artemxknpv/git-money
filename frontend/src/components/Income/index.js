import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../Category';
import AddCategory from '../AddCategory';
import styles from './Income.module.scss';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import setTotalMoney from '../../redux/actions/TotalMoney/setTotalMoney';

const Income = () => {
  const dispatch = useDispatch();
  const incomes = useSelector(state =>
    state.categories.filter(category => category.value === 'store')
  );
  useEffect(() => {
    const totalMoney = incomes.reduce((acc, store) => {
      return acc + store.currentNumber;
    }, 0);
    dispatch(setTotalMoney(totalMoney));
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <h4 className={styles.categoryHeader}>Доходы</h4>
        <Droppable droppableId={uuidv4()} direction="horizontal">
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.container}
              >
                {incomes &&
                  incomes.map((income, index) => {
                    return (
                      <div key={index}>
                        <Draggable
                          key={income.id}
                          draggableId={income.id}
                          index={index}
                          style={{ overflow: 'visible' }}
                        >
                          {(provided, spanshot) => {
                            return (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                // className={styles.container}
                              >
                                <Category
                                  value={income.value}
                                  id={income.id}
                                  key={income.id}
                                />
                              </div>
                            );
                          }}
                        </Draggable>
                      </div>
                    );
                  })}
                {provided.placeholder}
                <AddCategory value="store" />
              </div>
            );
          }}
        </Droppable>
      </div>
    </>
  );
};

export default Income;
