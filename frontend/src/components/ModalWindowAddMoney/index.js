import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import closeModalWindow from '../../redux/actions/modalWindow/closeModalWindowAddMoney.js';
import styles from './ModalWindowAddMoney.module.scss';
import addMoneyStarted from '../../redux/actions/addMoney/addMoneyStarted';
import TransactionHistoryIncome from '../../components/TransactionHistoryIncome/index';
import {motion, AnimatePresence} from 'framer-motion'

const backdrop = {
  visible: {opacity: 1},
  hidden: {opacity: 0},
}
const modal = {
  hidden: {
    x: "-50%",
    y: "-50%",
    scale: 0.1,
    opacity: 0
  },
  visible: {
    x: '-50%',
    y: "-50%",
    scale: 1,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.3 }


  },
}

const ModalWindowAddMoney = ({ show }) => {
  const [sum, setSum] = useState('');
  const userId = useSelector(state => state.user._id);
  const id = useSelector(state => state.isModal.id);
  const listTransactions = useSelector(state => state.transactions);
  const thisCategoryList = listTransactions.filter(
    transaction => transaction.to === id
  );
  console.log(thisCategoryList);
  const dispatch = useDispatch();
  // const showHideClassName = show
  //   ? `${styles.modal} ${styles.displayBlock}`
  //   : `${styles.modal} ${styles.displayNone}`;
  return (
    <AnimatePresence exitBeforeEnter>
      {show ?
        <>
        <motion.div className={styles.backdrop}
                    onClick={() => dispatch(closeModalWindow())}
        variants={backdrop}
                    initial='hidden'
                    animate='visible'
        >
        </motion.div>
          <motion.div className={styles.modalMain}
          variants={modal}
                      initial='hidden'
                      animate='visible'
          >
           <h3 className={styles.modalHeader}>Добавить сумму</h3>
               <p className={styles.modalSubheader}>
                Указанная сумма будет добавлена к этой категории
                 </p>
                {thisCategoryList &&
                thisCategoryList.map(transaction => {
                  return <TransactionHistoryIncome id={transaction._id
                  }
                  />;
              })}
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
                dispatch(addMoneyStarted(userId, id, Number(sum)));
                dispatch(closeModalWindow());
              }}
            >
              Добавить
            </button>
          </motion.div>
        </>

        : <></>

      }
    </AnimatePresence>

);
};

export default ModalWindowAddMoney;

// <div className={showHideClassName}>
//   <button onClick={() => dispatch(closeModalWindow())}>x</button>
//   <section className={styles.modalMain}>
//     <h3 className={styles.modalHeader}>Добавить сумму</h3>
//     <p className={styles.modalSubheader}>
//       Указанная сумма будет добавлена к этой категории
//     </p>
//     {thisCategoryList &&
//     thisCategoryList.map(transaction => {
//       return <TransactionHistoryIncome id={transaction._id} />;
//     })}
//     <input
//       type="text"
//       id="sum"
//       placeholder={'1000'}
//       value={sum}
//       onChange={event => setSum(event.target.value)}
//       className={styles.input}
//     />
//     <button
//       className={styles.addButton}
//       onClick={() => {
//         dispatch(addMoneyStarted(userId, id, Number(sum)));
//         dispatch(closeModalWindow());
//       }}
//     >
//       Добавить
//     </button>
//   </section>
// </div>
// )
