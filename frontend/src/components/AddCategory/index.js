import React from 'react';
import styles from './AddCategory.module.css';

function AddCategory(props) {
  return (
    <div className={styles.add_item}>
      <div className={styles.coin}></div>
      <p>Создать категорию</p>
    </div>
  );
}

export default AddCategory;
