import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InlineLoading from '../../../components/InlineLoading';
import loadingFinished from '../../../redux/actions/loadingHandlers/loadingFinished.js';
import closeModalWindow from '../../../redux/actions/modalWindow/closeModalWindowAddMoney.js';
import styles from './crudExpenseListModal.module.scss';
import modalCrudOperationsClosed from '../../../redux/actions/modalWindow/closeModalWindowCrudCategory';
import { motion, AnimatePresence } from 'framer-motion';
import expenses from '../../../img/expenses';
import editNameAction from '../../../redux/actions/crud/editNameCategory';
import editIconAction from '../../../redux/actions/crud/editIconCategory';
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
  const isLoading = useSelector(state => state.isLoading);
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
            {type === 'expense' && subtype === 'editName' ? (
              <>
                <h3 className={styles.modalHeader}>Изменить название</h3>
                <p className={styles.modalSubheader}>Введите новое название</p>
                <input
                  type="text"
                  id="name"
                  placeholder={'Название'}
                  value={name}
                  onChange={event => setName(event.target.value)}
                  className={styles.input}
                />
                {error && (
                  <div className={styles.errorContainer}>
                    <p className={styles.errorMessage}>{error}</p>
                  </div>
                )}
                <button
                  className={styles.addButton}
                  onClick={() => {
                    if (name !== '') {
                      dispatch(editNameAction(userId, id, name));
                      setError('');
                      setName('');
                      if (name.length < 20) {
                        dispatch(editNameAction(userId, id, name));
                        dispatch(modalCrudOperationsClosed());
                        setError('');
                      } else {
                        setError('Название не может быть больше 20 символов');
                      }
                    } else {
                      setError('Название не может быть пустым');
                    }
                  }}
                >
                  Изменить
                </button>
              </>
            ) : (
              <></>
            )}
            {type === 'expense' && subtype === 'editIcon' ? (
              <>
                <h3 className={styles.modalHeader}>Изменить иконку</h3>
                <p
                  className={styles.modalSubheader}
                  style={{ flexBasis: '100%' }}
                >
                  Выберите новую иконку:
                </p>
                <div className={styles.iconRow}>
                  {expenses.map((icon, index) => (
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
                  ))}
                </div>
                <button
                  className={styles.addButton}
                  onClick={() => {
                    dispatch(editIconAction(userId, id, chosenIcon));
                    dispatch(modalCrudOperationsClosed());
                  }}
                >
                  {!isLoading ? (
                    'Изменить'
                  ) : (
                    <i>
                      <InlineLoading loading={true} />
                    </i>
                  )}
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
