import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import differenceInHours from 'date-fns/differenceInHours';
import formatDistance from 'date-fns/formatDistance';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import TransactionsHistoryIncome from '../../components/TransactionHistoryIncome';
import { StyledHeader } from '../../styled-components/StyledHeader.js';
import styles from './IncomeList.module.scss';
import { AnimateSharedLayout, motion } from 'framer-motion';
import TransactionsHistoryExpensesForIncome from '../../components/TransansactionHistoryForIncome';

const Index = () => {
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
  const categories = useSelector(state => state.categories);
  const storeName = categories.filter(category => category.id === cat)[0].name;
  const thisCategoryList = listTransactions.filter(
    transaction => transaction.to === cat
  );
  const currentBalance = categories.filter(category => category.id === cat)[0]
    .currentNumber;
  const thisCategoryListTransactions = listTransactions.filter(transaction => {
    return transaction.from === cat;
  });
  let megaArray = [...thisCategoryList, ...thisCategoryListTransactions];
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
  console.log(objectTime);

  return (
    <div className={styles.container}>
      <StyledHeader>
        <div className={styles.arrowAndCatname}>
          <Link to={'/'} style={{ textDecoration: 'none', color: '#333333' }}>
            <i className="fas fa-arrow-left" />
          </Link>
          <h2 className={styles.header}>{storeName}</h2>
        </div>
        <p className={styles.editCategory}>Edit category</p>
      </StyledHeader>
      <h2>Current balance: ${currentBalance}</h2>
      {megaArray.length ? (
        Object.keys(objectTime).map(key => {
          return (
            <div>
              <h2 className={styles.timePoint}>{key}</h2>
              {objectTime[key].map(transaction => {
                // return (
                //   <TransactionHistoryExpenses
                //   id={transaction._id}
                //   key={transaction._id}
                //   />
                //   );
                if (transaction.value === 'loss') {
                  return (
                    <AnimateSharedLayout>
                      <motion.ul layout>
                        <TransactionsHistoryExpensesForIncome
                          id={transaction._id}
                          key={transaction._id}
                        />
                      </motion.ul>
                    </AnimateSharedLayout>
                  );
                } else if (transaction.value === 'gain') {
                  return (
                    <AnimateSharedLayout>
                      <motion.ul layout>
                        <TransactionsHistoryIncome
                          id={transaction._id}
                          key={transaction._id}
                        />
                      </motion.ul>
                    </AnimateSharedLayout>
                  );
                }
              })}
            </div>
          );
        })
      ) : (
        <div>
          <p className={styles.emptyWarning}>
            История добавлений в хранилище {storeName} пуста
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
