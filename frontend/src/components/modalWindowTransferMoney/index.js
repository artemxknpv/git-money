import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowTransferMoney';
import styles from './ModalWindowTransferMoney.module.scss';
import transferMoneyStarted from '../../redux/actions/transferMoney/transferMoneyStarted';

const ModalWindowAddMoney = ({ show }) => {
  const [sum, setSum] = useState('');
  const userId = useSelector(state => state.user._id);
  let nameFrom = '';
  let nameTo = '';
  const categories = useSelector(state => state.categories);
  const idTo = useSelector(state => state.isTransferMoneyModal.idTo);
  const idFrom = useSelector(state => state.isTransferMoneyModal.idFrom);

  if (idTo && idFrom) {
    nameFrom = categories.filter(category => category.id === idFrom)[0].name;
    nameTo = categories.filter(category => category.id === idTo)[0].name || '';
  }
  const dispatch = useDispatch();
  const showHideClassName = show
    ? `${styles.modal} ${styles.displayBlock}`
    : `${styles.modal} ${styles.displayNone}`;
  return (
    <div className={`${showHideClassName}`}>
      <button onClick={() => dispatch(closeModalWindow())}>x</button>
      <section className={styles.modalMain}>
        <h3 className={styles.modalHeader}>Перевести сумму</h3>
        <p className={styles.modalSubheader}>
          Указанная сумма будет вычтена из хранилища {nameFrom} и перенесена в
          раздел расходов {nameTo}
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
            dispatch(transferMoneyStarted(userId, idTo, idFrom, Number(sum)));
            setSum('');
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
