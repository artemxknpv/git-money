import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ModalWindowAddCategory.module.scss';
import closeModalWindowAddCategory from '../../redux/actions/modalWindow/closeModalWindowAddCategory';
import addCategoryStarted from '../../redux/actions/addCategory/addCategoryStarted';
import { motion, AnimatePresence } from 'framer-motion';
import expenses from '../../img/expenses';
import incomes from '../../img/incomes';

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
  const [limit, setLimit] = useState(null);
  const [error, setError] = useState('');
  const userId = useSelector(state => state.user._id);
  const type = useSelector(state => state.isCategoryModal.type);
  const dispatch = useDispatch();
  const [chosenIcon, setChosenIcon] = useState(0);

  return (
    <AnimatePresence exitBeforeEnter>
      {show ? (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={() => {
              setName('');
              dispatch(closeModalWindowAddCategory());
              setError('');
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
            {type === 'expenditure' && (
              <>
                <p className={styles.modalSubheader}>Введите лимит категории</p>
                <input
                  type="text"
                  id="limit"
                  placeholder={'10000'}
                  value={limit}
                  onChange={event => setLimit(event.target.value)}
                  className={styles.input}
                />
              </>
            )}
            <p className={styles.modalSubheader} style={{ flexBasis: '100%' }}>
              Выберите иконку:
            </p>
            <div className={styles.iconRow}>
              {type === 'store'
                ? incomes.map((icon, index) => (
                    <motion.button
                      onClick={() => setChosenIcon(index)}
                      whileTap={{ scale: 1.05 }}
                      className={
                        index === chosenIcon
                          ? styles.chosenIcon
                          : styles.iconOption
                      }
                    >
                      {icon}
                    </motion.button>
                  ))
                : expenses.map((icon, index) => (
                    <motion.button
                      whileTap={{ scale: 1.05 }}
                      onClick={() => setChosenIcon(index)}
                      className={
                        index === chosenIcon
                          ? styles.chosenIcon
                          : styles.iconOption
                      }
                    >
                      {icon}
                    </motion.button>
                  ))}
            </div>
            {error && <p className={styles.modalSubheader}>{error}</p>}
            <button
              className={styles.addButton}
              onClick={() => {
                if (name !== '') {
                  dispatch(
                    addCategoryStarted(userId, name, type, chosenIcon, limit)
                  );
                  dispatch(closeModalWindowAddCategory());
                } else {
                  setError('Поле ввода не может быть пустым');
                }
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
