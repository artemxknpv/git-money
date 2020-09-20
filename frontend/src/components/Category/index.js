import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import WalletFilledIcon from '../../img/WalletFilledIcon.jsx';
import openModalWindow from '../../redux/actions/modalWindow/openModalWindowAddMoney.js';
import styles from './Category.module.scss';

const Category = ({ value, id }) => {
  const [add, setAdd] = useState('');
  const userId = useSelector(state => state.user._id);

  const dispatch = useDispatch();
  const category = useSelector(state =>
    state.categories.filter(category => category.id === id)
  )[0];
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        onClick={
          value === 'store' ? () => dispatch(openModalWindow(id)) : () => {}
        }
      >
        <WalletFilledIcon />
      </div>
      <p className={styles.categorySubheader} style={{ fontWeight: '500' }}>
        {category.name}
      </p>
      <p className={styles.categorySubheader}>{category.currentNumber} $</p>
    </div>
  );
};

export default Category;
