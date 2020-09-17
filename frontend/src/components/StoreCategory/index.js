import React from 'react';
import styles from './StoreCategory.module.css';


function StoreCategory(props) {
  const style = styles.coin + ' ' + styles[ props.type ];
  return (
    <div className={styles.item}>
      <div className={style}></div>
      <p>{props.name}</p>
    </div>
  );
}

export default StoreCategory;
