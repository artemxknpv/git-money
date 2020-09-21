import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowAddMoney.js';
import styles from './ModalWindowAddMoney.module.scss';
import addMoneyStarted from '../../redux/actions/addMoney/addMoneyStarted';
import TransactionHistoryIncome from '../../components/TransactionHistoryIncome/index';

const ModalWindowAddMoney = ({ show }) => {
  const [sum, setSum] = useState('');
  const userId = useSelector(state => state.user._id);
  const id = useSelector(state => state.isModal.id);
  const listTransactions = useSelector(state => state.transactions);
  const thisCategoryList = listTransactions.filter(
    transaction => transaction.to === id
  );
  console.log(thisCategoryList);
  const dispatch = useDispatch();
  const showHideClassName = show
    ? `${styles.modal} ${styles.displayBlock}`
    : `${styles.modal} ${styles.displayNone}`;
  return (
    <div className={`${showHideClassName}`}>
      <button onClick={() => dispatch(closeModalWindow())}>x</button>
      <section className={styles.modalMain}>
        <h3 className={styles.modalHeader}>Добавить сумму</h3>
        <p className={styles.modalSubheader}>
          Указанная сумма будет добавлена к этой категории
        </p>
        <button
          onClick={() => {
            dispatch(closeModalWindow());
          }}
        >
          <Link to={`/income/${id}`}>Открой блять</Link>
        </button>
        {/*// TODO КНОПКА*/}
        {/*{thisCategoryList &&*/}
        {/*  thisCategoryList.map(transaction => {*/}
        {/*    return <TransactionHistoryIncome id={transaction._id} />;*/}
        {/*  })}*/}
        <input
          type="text"
          id="sum"
          placeholder={'1000'}
          value={sum}
          onChange={event => setSum(event.target.value)}
          className={styles.input}
        />
        <button
          className={styles.addButton}
          onClick={() => {
            dispatch(addMoneyStarted(userId, id, Number(sum)));
            dispatch(closeModalWindow());
          }}
        >
          Добавить
        </button>
      </section>
    </div>
  );
};

export default ModalWindowAddMoney;
