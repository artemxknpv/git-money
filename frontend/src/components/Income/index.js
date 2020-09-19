import React from 'react';
import { useSelector } from 'react-redux';
import Category from '../Category';
import AddCategory from '../AddCategory';
import styles from './Income.module.scss';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const Income = () => {
  const incomes = useSelector(state =>
    state.categories.filter(category => category.value === 'store')
  );
  return (
    <>
      {/* <div className={styles.wrapper}> */}
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
                    <div>
                      <Draggable
                        key={income.id}
                        draggableId={income.id}
                        index={index}
                      >
                        {(provided, spanshot) => {
                          return (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
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
      {/* </div> */}
    </>
  );
};

export default Income;
