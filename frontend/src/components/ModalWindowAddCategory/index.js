import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ModalWindowAddCategory.module.scss';
import closeModalWindowAddCategory from '../../redux/actions/modalWindow/closeModalWindowAddCategory';
import addCategoryStarted from '../../redux/actions/addCategory/addCategoryStarted';
import { motion, AnimatePresence } from 'framer-motion';
// import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowAddMoney';
// import TransactionHistoryIncome from '../TransactionHistoryIncome';
// import { Link } from 'react-router-dom';
// import addMoneyStarted from '../../redux/actions/addMoney/addMoneyStarted';

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

function ModalWindowAddCategory({ show }) {
  const [name, setName] = useState('');
  const userId = useSelector(state => state.user._id);
  const type = useSelector(state => state.isCategoryModal.type);
  const dispatch = useDispatch();
  return (
    <AnimatePresence exitBeforeEnter>
      {show ? (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={() => dispatch(closeModalWindowAddCategory())}
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
            <h3 className={styles.modalHeader}>Добавить категорию</h3>
            <p className={styles.modalSubheader}>Введите название категории</p>
            <input
              type="text"
              id="name"
              placeholder={'Название'}
              value={name}
              onChange={event => setName(event.target.value)}
              className={styles.input}
            />
            <button
              className={styles.addButton}
              onClick={() => {
                dispatch(addCategoryStarted(userId, name, type));
                dispatch(closeModalWindowAddCategory());
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
}

export default ModalWindowAddCategory;

// <div className={`${showHideClassName}`}>
//   <button onClick={() => dispatch(closeModalWindowAddCategory())}>x</button>
//   <section className={styles.modalMain}>
//
//   </section>
// </div>
