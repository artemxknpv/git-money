import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowTransactionHistory';
import TransactionHistoryExpenses from '../TransactionHistoryExpenses';
import styles from './TransactionsHistory.module.scss';

const ModalWindowTransactionHistory = ({ show }) => {
  const [sum, setSum] = useState('');
  const userId = useSelector(state => state.user._id);
  const transactions = useSelector(state => state.transactions);
  const currentIdExpense = useSelector(
    state => state.isTransactionHistoryModal.idExpense
  );
  const transactionsToThisExpense = transactions.filter(transaction => {
    return transaction.to === currentIdExpense;
  });
  console.log(transactionsToThisExpense);
  const dispatch = useDispatch();
  const showHideClassName = show
    ? `${styles.modal} ${styles.displayBlock}`
    : `${styles.modal} ${styles.displayNone}`;
  return (
    <div className={`${showHideClassName}`}>
      <button onClick={() => dispatch(closeModalWindow())}>x</button>
      <section className={styles.modalMain}>
        <h3 className={styles.modalHeader}>История ваших расходов</h3>
        <p className={styles.modalSubheader}>
          Здесь ты МУДАК можешь посмотреть на историю своих транзакций
          отредактировать их там, мне как бы похуй, если честно. Долбоёб блять
          СДОХНИ
        </p>
        {transactionsToThisExpense.length ? (
          transactionsToThisExpense.map(element => {
            return <TransactionHistoryExpenses id={element._id} />;
          })
        ) : (
          <h2>История ваших покупок в данной категории пуста</h2>
        )}
      </section>
    </div>
  );
};

export default ModalWindowTransactionHistory;
