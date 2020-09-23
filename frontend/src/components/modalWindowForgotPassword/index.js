import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowForgotPassword';
import styles from './ModalWindowForgotPassword.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import sendNewPasswordStart from "../../redux/actions/sendNewPassword/sendNewPasswordStart";
import sendNewPasswordEnd from "../../redux/actions/sendNewPassword/sendNewPasswordEnd";


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

const ModalWindowForgotPassword = ({ show }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const isInvalid = useSelector(state => state.isNewPasswordSended.isInvalid)
  console.log(isInvalid)
  return (
    <AnimatePresence exitBeforeEnter>
      {show ? (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={() => {
              setEmail('');
              dispatch(closeModalWindow(''));
              dispatch(sendNewPasswordEnd())
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
            <h3 className={styles.modalHeader}>Востановить пароль</h3>
            <p className={styles.modalSubheader}>
              Введите ваш e-mail адрес
            </p>
            {isInvalid ? <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>Что то пошло не так</p>
            </div> : <></>}
            <input
              type="text"
              id="sum"
              placeholder={'Email'}
              value={email}
              onChange={event => setEmail(event.target.value)}
              className={styles.input}
            />
            <button
              className={styles.addButton}
              onClick={() => {
                dispatch(sendNewPasswordStart(email));
                console.log(email)
              }}
            >
              Выслать пароль
            </button>
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
};

export default ModalWindowForgotPassword;
