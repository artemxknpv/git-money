import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TransactionHistoryIncome.module.scss';

function TransactionsHistoryIncome({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const transactions = useSelector(state => state.transactions);
  const transaction = transactions.filter(
    transaction => transaction._id === id
  )[0];
  const [prettyTime, setPrettyTime] = useState('');

  useEffect(() => {
    setPrettyTime(new Date(transaction.time).toLocaleString());
  }, [transaction]);

  const targetCategory = { name: 'Name Here' };

  return (
    <motion.li layout style={{ listStyle: 'none' }} onClick={toggleOpen}>
      <motion.div
        layout
        className={isOpen ? styles.openedWrapper : styles.wrapper}
        whileHover={{
          scale: 1.1,
          boxShadow: '3px 3px 15px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ duration: 0.3, ease: [0.17, 0.67, 0.83, 0.67] }}
      >
        <p className={styles.amount}>${transaction && transaction.amount}</p>
        <p className={styles.time}>At time: {prettyTime && prettyTime}</p>
        {targetCategory && (
          <p className={styles.targetCategory}>{targetCategory.name}</p>
        )}
        <AnimatePresence>
          {isOpen && (
            <motion.p
              transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.additionalContent}
            >
              Ты пидор
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.li>
  );
}

export default TransactionsHistoryIncome;
