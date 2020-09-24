import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadingFinished from '../../redux/actions/loadingHandlers/loadingFinished.js';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowTransferMoney';
import InlineLoading from '../InlineLoading';
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
  const isLoading = useSelector(state => state.isLoading);

  const [sum, setSum] = useState('');

  const [error, setError] = useState('');
  const userId = useSelector(state => state.user._id);
  let nameFrom = '';
  let currentNumberFrom = 0;
  let nameTo = '';
  const categories = useSelector(state => state.categories);
  const idTo = useSelector(state => state.isTransferMoneyModal.idTo);
  const idFrom = useSelector(state => state.isTransferMoneyModal.idFrom);

  useEffect(() => {
    if (!isLoading) {
      dispatch(closeModalWindow());
      setSum('');
    }
  }, [isLoading]);

  if (idTo && idFrom) {
    nameFrom = categories.filter(category => category.id === idFrom)[0].name;
    currentNumberFrom = categories.filter(category => category.id === idFrom)[0]
      .currentNumber;
    nameTo = categories.filter(category => category.id === idTo)[0].name || '';
  }
  const dispatch = useDispatch();
  // const showHideClassName = show
  //   ? `${styles.modal} ${styles.displayBlock}`
  //   : `${styles.modal} ${styles.displayNone}`;

  const handleTransferMoney = () => {
    if (sum > 0) {
       dispatch(transferMoneyStarted(userId, idTo, idFrom, Number(sum)));
    } else {
      setError('Вы не можете перевести 0$');
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {show ? (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={() => {
              dispatch(closeModalWindow());
              dispatch(loadingFinished());
              setError('');
              setSum('');
            }}
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
            <h3 className={styles.modalHeader}>Перевести сумму</h3>
            <p className={styles.modalSubheader}>
              Указанная сумма будет вычтена из хранилища {nameFrom} и перенесена
              в раздел расходов {nameTo}
            </p>
            <input
              type="number"
              id="sum"
              placeholder={'1000'}
              value={sum}
              onChange={event => setSum(event.target.value)}
              className={styles.input}
            />
            {error && <p className={styles.modalSubheader}>{error}</p>}
            <button
              className={!isLoading ? styles.addButton : styles.loadingButton}
              onClick={handleTransferMoney}
            >
              {!isLoading ? (
                'Добавить'
              ) : (
                <i>
                  <InlineLoading />
                </i>
              )}
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
