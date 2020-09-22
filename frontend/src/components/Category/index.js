import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BagOfGoods from '../../img/BagOfGoods.jsx';
import WalletFilledIcon from '../../img/WalletFilledIcon.jsx';
import openModalWindow from '../../redux/actions/modalWindow/openModalWindowAddMoney.js';
import openModalWindowTransactionHistoryExpenses from '../../redux/actions/modalWindow/openModalWindowTransactionHistory';
import styles from './Category.module.scss';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const Category = ({ value, id }) => {
  const history = useHistory();
  const [add, setAdd] = useState('');
  const userId = useSelector(state => state.user._id);

  const dispatch = useDispatch();
  const category = useSelector(state =>
    state.categories.filter(category => category.id === id)
  )[0];

  return (
    <motion.div
      className={styles.card}
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
    >
      <div
        className={styles.image}
        onClick={
          value === 'store'
            ? () => dispatch(openModalWindow(id))
            : () => {
                dispatch(openModalWindowTransactionHistoryExpenses(id));
                history.push(`/expense/${id}`);
              }
        }
      >
        {value === 'store' ? <WalletFilledIcon /> : <BagOfGoods />}
      </div>
      <p className={styles.categorySubheader} style={{ fontWeight: '700' }}>
        {category.name}
      </p>
      <p className={styles.categorySum}>{category.currentNumber}$</p>
    </motion.div>
  );
};

export default Category;
