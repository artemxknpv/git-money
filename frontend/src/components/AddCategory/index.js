import React from 'react';
import styles from './AddCategory.module.scss';
import { useDispatch } from 'react-redux';
import modalWindowCategoryOpened from '../../redux/actions/modalWindow/openModalWindowAddCategory';

const AddCategory = ({ value }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        onClick={() => {
          dispatch(modalWindowCategoryOpened(value));
        }}
      >
        +
      </div>
      <p className={styles.categorySubheader}>Создать категорию</p>
    </div>
  );
};

export default AddCategory;
