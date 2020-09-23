import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './crudIncomeListModal.module.scss';
import modalCrudOperationsClosed from '../../../redux/actions/modalWindow/closeModalWindowCrudCategory';
import { motion, AnimatePresence } from 'framer-motion';
import expenses from '../../../img/expenses';
import incomes from '../../../img/incomes';
import editNameAction from '../../../redux/actions/crud/editNameCategory';
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
function ModalWindowCrudCategory({ show }) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user._id);
  const modalConfiguration = useSelector(state => state.isCrudModalWindow);
  const type = modalConfiguration.type;
  const subtype = modalConfiguration.subtype;
  const id = modalConfiguration.id;
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [chosenIcon, setChosenIcon] = useState(0);
  return (
    <AnimatePresence exitBeforeEnter>
      {show ? (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={() => {
              setName('');
              dispatch(modalCrudOperationsClosed());
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
            {type === 'store' && subtype === 'editName' ? (
              <>
                <h3 className={styles.modalHeader}>
                  Изменить название хранилища
                </h3>
                <p className={styles.modalSubheader}>
                  Введите новое название хранилища
                </p>
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
                    dispatch(editNameAction(userId, id, name));
                    dispatch(modalCrudOperationsClosed());
                  }}
                >
                  Изменить
                </button>
              </>
            ) : (
              <></>
            )}
            {type === 'store' && subtype === 'editIcon' ? (
              <>
                <h3 className={styles.modalHeader}>
                  Изменить иконку хранилища
                </h3>
                <p
                  className={styles.modalSubheader}
                  style={{ flexBasis: '100%' }}
                >
                  Выберите иконку:
                </p>
                <div className={styles.iconRow}>
                  {incomes.map((icon, index) => (
                    <motion.button
                      onClick={() => setChosenIcon(index + 14)}
                      whileTap={{ scale: 1.05 }}
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
                <button className={styles.addButton} onClick={() => {}}>
                  Изменить
                </button>
              </>
            ) : (
              <></>
            )}
            {type === 'store' && subtype == 'hideCategory' ? (
              <>
                <h3 className={styles.modalHeader}>
                  Удалить категорию хранилища
                </h3>
                <p
                  className={styles.modalSubheader}
                  style={{ flexBasis: '100%' }}
                >
                  Данное действие нельзя будет вернуть назад, пожалуйста
                  подумайте еще раз перед тем, как нажать на кнопку удалить
                </p>
                <button className={styles.addButton} onClick={() => {}}>
                  Удалить
                </button>
              </>
            ) : (
              <></>
            )}
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
}

export default ModalWindowCrudCategory;
