import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowTransactionHistory';
import TransactionHistoryExpenses from '../TransactionHistoryExpenses';
import styles from './TransactionsHistory.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: {
    x: '-50%',
    y: '-50%',
    scale: 0.1,
    opacity: 0,
  },
  visible: {
    x: '-50%',
    y: '-50%',
    scale: 1,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.3 },
  },
};

const ModalWindowTransactionHistory = ({ show }) => {
  const dispatch = useDispatch();
  const [sum, setSum] = useState('');
  const [currentName, setCurrentname] = useState(null);
  const userId = useSelector(state => state.user._id);
  const transactions = useSelector(state => state.transactions);
  const currentIdExpense = useSelector(
    state => state.isTransactionHistoryModal.idExpense
  );
  const currentCategory = useSelector(state => {
    return state.categories.filter(category => {
      return category.id === currentIdExpense;
    })[0];
  });
  const transactionsToThisExpense = transactions.filter(transaction => {
    return transaction.to === currentIdExpense;
  });

  return (
    <AnimatePresence exitBeforeEnter>
      {show ? (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={() => dispatch(closeModalWindow())}
            variants={backdrop}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className={styles.modalMain}
            variants={modal}
            initial="hidden"
            animate="visible"
          >
        <h5 className={styles.modalHeader}>
          История ваших расходов в категории: <br />
          {currentCategory && currentCategory.name}
        </h5>
        <button
          onClick={() => {
            dispatch(closeModalWindow());
          }}
        >
          <Link to={`expense/${currentIdExpense}`}>Что тебе надо?</Link>
        </button>
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
};

export default ModalWindowTransactionHistory;
