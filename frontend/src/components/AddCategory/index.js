import React, { useState } from 'react';
import styles from './AddCategory.module.scss';
import { useDispatch } from 'react-redux';

const AddCategory = ({ type }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>+</div>
      <p className={styles.categorySubheader}>Создать категорию</p>
    </div>
  );
};

export default AddCategory;
