import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ModalWindowAddCategory.module.scss';
import closeModalWindowAddCategory from '../../redux/actions/modalWindow/closeModalWindowAddCategory';
import addCategoryStarted from '../../redux/actions/addCategory/addCategoryStarted';

function ModalWindowAddCategory({ show }) {
  const [name, setName] = useState('');
  const userId = useSelector(state => state.user._id);
  const type = useSelector(state => state.isCategoryModal.type);
  const dispatch = useDispatch();
  const showHideClassName = show
    ? `${styles.modal} ${styles.displayBlock}`
    : `${styles.modal} ${styles.displayNone}`;
  return (
    <div className={`${showHideClassName}`}>
      <button onClick={() => dispatch(closeModalWindowAddCategory())}>x</button>
      <section className={styles.modalMain}>
        <h3 className={styles.modalHeader}>Добавить категорию</h3>
        <p className={styles.modalSubheader}>Введите название категории</p>
        <input
          type="text"
          id="name"
          placeholder={'Название'}
          value={name}
          onChange={event => setName(event.target.value)}
          className={styles.input}
        />
        <button
          className={styles.addButton}
          onClick={() => {
            dispatch(addCategoryStarted(userId, name, type));
            dispatch(closeModalWindowAddCategory());
          }}
        >
          Добавить
        </button>
      </section>
    </div>
  );
}

export default ModalWindowAddCategory;
