import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowAddMoney.js';
import styles from './ModalWindowAddMoney.module.scss';

const ModalWindowAddMoney = ({ show }) => {
  const [sum, setSum] = useState('');
  const dispatch = useDispatch();
  const showHideClassName = show
    ? `${styles.modal} ${styles.displayBlock}`
    : `${styles.modal} ${styles.displayNone}`;
  return (
    <div
      className={`${showHideClassName}`}
      onClick={() => dispatch(closeModalWindow())}
    >
      <section className={styles.modalMain}>
        <h3 className={styles.modalHeader}>Добавить сумму</h3>
        <p className={styles.modalSubheader}>
          Указанная сумма будет добавлена к этой категории
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
          onClick={() => dispatch(closeModalWindow())}
        >
          Добавить
        </button>
      </section>
    </div>
  );
};

export default ModalWindowAddMoney;
