import React from 'react';
import styles from './Category.module.css';

const Category = props => {
  const style = styles.coin + ' ' + styles[props.type];
  return (
    <div className={styles.item}>
      <div className={style}></div>
      <p>{props.name}</p>
    </div>
  );
};

export default Category;
