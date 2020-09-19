import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowAddMoney.js';
import styles from './ModalWindowAddMoney.module.scss';
import addMoneyStarted from '../../redux/actions/addMoney/addMoneyStarted';

const ModalWindowAddMoney = ({ show }) => {
  const [sum, setSum] = useState('');
  const userId = useSelector(state => state.user._id);
  const id = useSelector(state => state.isModal.id);
  const dispatch = useDispatch();
  const showHideClassName = show
    ? `${styles.modal} ${styles.displayBlock}`
    : `${styles.modal} ${styles.displayNone}`;
  return (
    <div
      className={`${showHideClassName}`}
      // onClick={() => dispatch(closeModalWindow())}
    >
      <button onClick={() => dispatch(closeModalWindow())}>x</button>
      <section className={styles.modalMain}>
        <h3 className={styles.modalHeader}>Добавить сумму</h3>
        <p className={styles.modalSubheader}>
          Указанная сумма будет вычтена их хранилища 1 в раздел расходов 2
        </p>
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
