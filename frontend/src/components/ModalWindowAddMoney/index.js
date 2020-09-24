import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowAddMoney.js';
import InlineLoading from '../InlineLoading';
import styles from './ModalWindowAddMoney.module.scss';
import addMoneyStarted from '../../redux/actions/addMoney/addMoneyStarted';
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
  const userId = useSelector(state => state.user._id);
  const id = useSelector(state => state.isModal.id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading) {
      dispatch(closeModalWindow());
      setSum('');
    }
  }, [isLoading]);

  return (
    <AnimatePresence exitBeforeEnter>
      {show ? (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={() => {
              setSum('');
              dispatch(closeModalWindow());
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
            <Link to={`/income/${id}`}>
              <button
                onClick={() => {
                  setSum('');
                  dispatch(closeModalWindow());
                }}
                className={styles.historyButton}
              >
                Дополнительно
              </button>
            </Link>
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
              className={!isLoading ? styles.addButton : styles.loadingButton}
              onClick={() => {
                dispatch(addMoneyStarted(userId, id, Number(sum)));
              }}
            >
              {!isLoading ? (
                <span className={styles.buttonText}>Добавить</span>
              ) : (
                <span className={styles.buttonText}>
                  <i>
                    <InlineLoading loading={true} />
                  </i>
                </span>
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
