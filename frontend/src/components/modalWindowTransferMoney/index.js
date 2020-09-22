import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowTransferMoney';
import styles from './ModalWindowTransferMoney.module.scss';
import transferMoneyStarted from '../../redux/actions/transferMoney/transferMoneyStarted';
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
    <AnimatePresence exitBeforeEnter>
      {show ? (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={() => dispatch(closeModalWindow())}
            variants={backdrop}
            initial="hidden"
            animate="visible"
          ></motion.div>
          <motion.div
            className={styles.modalMain}
            variants={modal}
            initial="hidden"
            animate="visible"
          >
            <h3 className={styles.modalHeader}>Перевести сумму</h3>
            <p className={styles.modalSubheader}>
              Указанная сумма будет вычтена из хранилища {nameFrom} и перенесена
              в раздел расходов {nameTo}
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
                dispatch(
                  transferMoneyStarted(userId, idTo, idFrom, Number(sum))
                );
                setSum('');
                dispatch(closeModalWindow());
              }}
            >
              Добавить
            </button>
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
};

export default ModalWindowAddMoney;
