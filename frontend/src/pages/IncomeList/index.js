import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade.js';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import differenceInHours from 'date-fns/differenceInHours';
import formatDistance from 'date-fns/formatDistance';
import TransactionsHistoryIncome from '../../components/TransactionHistoryIncome';
import { StyledHeader } from '../../styled-components/StyledHeader.js';
import styles from './IncomeList.module.scss';
import { motion } from 'framer-motion';
import TransactionsHistoryExpensesForIncome from '../../components/TransansactionHistoryForIncome';
import modalWindowCrudCategoryOpened from '../../redux/actions/modalWindow/openModalWindowCrudCategory';
import ModalWindowCrudCategory from './crudIncomeListModal';
import TransferHistoryGain from './TransferBStores/transferGain';
import TransferHistoryLoss from './TransferBStores/transferLoss';

const Index = () => {
  const dispatch = useDispatch();

  function sortTime(elementA, elementB) {
    if (elementA.time < elementB.time) {
      return 1;
    } else if (elementA.time > elementB.time) {
      return -1;
    } else {
      return 0;
    }
  }
  const { cat } = useParams();
  const listTransactions = useSelector(state => state.transactions);
  const transfers = useSelector(state => state.transfers);
  const categories = useSelector(state => state.categories);
  const showCrudModal = useSelector(state => state.isCrudModalWindow.isOpened);
  const storeName = categories.filter(category => category.id === cat)[0].name;
  let thisCategoryList = listTransactions.filter(
    transaction => transaction.to === cat
  );
  let toThisCategoryTransfer = transfers.filter(transfer => {
    return transfer.to === cat;
  });
  toThisCategoryTransfer = toThisCategoryTransfer.map(transfer => {
    return { ...transfer, value: 'gainTransfer' };
  });
  let fromThisCategoryTransfer = transfers.filter(transfer => {
    return transfer.from === cat;
  });
  fromThisCategoryTransfer = fromThisCategoryTransfer.map(transfer => {
    return { ...transfer, value: 'lossTransfer' };
  });
  console.log('loss', toThisCategoryTransfer, 'gain', fromThisCategoryTransfer);
  const currentBalance = categories.filter(category => category.id === cat)[0]
    .currentNumber;
  const thisCategoryListTransactions = listTransactions.filter(transaction => {
    return transaction.from === cat;
  });
  let megaArray = [
    ...thisCategoryList,
    ...thisCategoryListTransactions,
    ...toThisCategoryTransfer,
    ...fromThisCategoryTransfer,
  ];
  console.log(megaArray);
  megaArray = megaArray.sort(sortTime);
  megaArray = megaArray.map(transaction => {
    return {
      ...transaction,
      stringTime:
        differenceInHours(Date.now(), new Date(transaction.time)) === 0
          ? 'this hour'
          : formatDistance(Date.now(), new Date(transaction.time)) + ' ago',
    };
  });
  const objectTime = {};
  megaArray.forEach(transaction => {
    const currentStringTime = transaction.stringTime;
    if (objectTime[currentStringTime]) {
      objectTime[currentStringTime].push(transaction);
    } else {
      objectTime[currentStringTime] = [transaction];
    }
  });

  return (
    <Fade bottom cascade>
      <div className={styles.container}>
        <ModalWindowCrudCategory show={showCrudModal} />
        <StyledHeader>
          <div className={styles.arrowAndCatname}>
            <Link to={'/'} style={{ textDecoration: 'none', color: '#333333' }}>
              <motion.i
                whileTap={{ scale: 0.8 }}
                className="fas fa-arrow-left"
              />
            </Link>
            <h2 className={styles.header}>{storeName}</h2>
          </div>
          <p className={styles.totalSpentText}>
            <span role="img" aria-label="moneybag">
              💰
            </span>
            Текущий баланс: ${currentBalance}
          </p>
          <motion.button
            onClick={() => {
              dispatch(modalWindowCrudCategoryOpened('store', 'editIcon', cat));
            }}
            whileHover={{ scale: 1.1 }}
            className={styles.editCategory}
          >
            Edit icon
          </motion.button>
          <motion.button
            onClick={() => {
              dispatch(modalWindowCrudCategoryOpened('store', 'editName', cat));
            }}
            whileHover={{ scale: 1.1 }}
            className={styles.editCategory}
          >
            Edit name
          </motion.button>
          <motion.button
            onClick={() => {
              dispatch(
                modalWindowCrudCategoryOpened('store', 'transferStarted', cat)
              );
            }}
            whileHover={{ scale: 1.1 }}
            className={styles.editCategory}
          >
            Transfer
          </motion.button>
          <motion.button
            onClick={() => {
              dispatch(
                modalWindowCrudCategoryOpened('store', 'hideCategory', cat)
              );
            }}
            whileHover={{ scale: 1.1 }}
            className={styles.editCategory}
          >
            Delete category
          </motion.button>
        </StyledHeader>
        {megaArray.length ? (
          Object.keys(objectTime).map(key => {
            return (
              <div className={styles.timeBlock}>
                <h2 className={styles.timePoint}>{key}</h2>
                {objectTime[key].map(transaction => {
                  if (transaction.value === 'loss') {
                    return (
                      <motion.ul>
                        <TransactionsHistoryExpensesForIncome
                          id={transaction._id}
                          key={transaction._id}
                        />
                      </motion.ul>
                    );
                  } else if (transaction.value === 'gain') {
                    return (
                      <motion.ul>
                        <TransactionsHistoryIncome
                          id={transaction._id}
                          key={transaction._id}
                        />
                      </motion.ul>
                    );
                  } else if (transaction.value === 'gainTransfer') {
                    return (
                      <motion.ul>
                        <TransferHistoryGain
                          id={transaction._id}
                          key={transaction._id}
                        />
                      </motion.ul>
                    );
                  } else if (transaction.value === 'lossTransfer') {
                    return (
                      <motion.ul>
                        <TransferHistoryLoss
                          id={transaction._id}
                          key={transaction._id}
                        />
                      </motion.ul>
                    );
                  }
                })}
              </div>
            );
          })
        ) : (
          <div>
            <p className={styles.emptyWarning}>
              История операций в категории {storeName} пуста
            </p>
          </div>
        )}
      </div>
    </Fade>
  );
};

export default Index;
