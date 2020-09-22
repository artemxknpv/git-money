import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import differenceInHours from 'date-fns/differenceInHours';
import formatDistance from 'date-fns/formatDistance';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import deleteCategoryStarted from '../../redux/actions/deleteCategory/deleteCategoryStarted.js';
import { StyledHeader } from '../../styled-components/StyledHeader.js';
import styles from './ExpenseList.module.scss';
import TransactionHistoryExpenses from '../../components/TransactionHistoryExpenses';
import { useDispatch } from 'react-redux';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const { cat } = useParams();
  const transactions = useSelector(state => state.transactions);
  const currentCategory = useSelector(state => {
    return state.categories.filter(category => {
      return category.id === cat;
    })[0];
  });
  let transactionsToThisExpense = transactions.filter(transaction => {
    return transaction.to === cat;
  });
  function sortTime(elementA, elementB) {
    if (elementA.time < elementB.time) {
      return 1;
    } else if (elementA.time > elementB.time) {
      return -1;
    } else {
      return 0;
    }
  }
  transactionsToThisExpense = transactionsToThisExpense.sort(sortTime);
  transactionsToThisExpense = transactionsToThisExpense.map(transaction => {
    return {
      ...transaction,
      stringTime:
        differenceInHours(Date.now(), new Date(transaction.time)) === 0
          ? 'this hour'
          : formatDistance(Date.now(), new Date(transaction.time)) + ' ago',
    };
  });
  const userId = useSelector(state => state.user._id);
  const objectTime = {};
  transactionsToThisExpense.forEach(transaction => {
    const currentStringTime = transaction.stringTime;
    if (objectTime[currentStringTime]) {
      objectTime[currentStringTime].push(transaction);
    } else {
      objectTime[currentStringTime] = [transaction];
    }
  });

  function handleClick() {
    dispatch(deleteCategoryStarted(userId, cat));
    history.push('/');
  }

  return isLoading ? (
    <>
      <SkeletonLoader
        width={'20%'}
        style={{ margin: 'auto', marginTop: '7rem' }}
      />
      <SkeletonLoader
        width={'20%'}
        style={{ margin: 'auto', marginTop: '1rem' }}
      />
      <SkeletonLoader
        width={'20%'}
        style={{ margin: 'auto', marginTop: '1rem' }}
      />
      <SkeletonLoader
        width={'20%'}
        style={{ margin: 'auto', marginTop: '1rem' }}
      />
    </>
  ) : (
    <div className={styles.container}>
      <StyledHeader>
        <div className={styles.arrowAndCatname}>
          <Link to={'/'} style={{ textDecoration: 'none', color: '#333333' }}>
            <i className="fas fa-arrow-left" />
          </Link>
          <h2 className={styles.header}>{currentCategory.name}</h2>
        </div>
        <span className={styles.editCategory}>Edit category</span>
      </StyledHeader>
      <section>
        {transactionsToThisExpense.length ? (
          Object.keys(objectTime).map(key => {
            return (
              <div>
                <h2 className={styles.timePoint}>{key}</h2>
                {objectTime[key].map(transaction => {
                  return (
                    <TransactionHistoryExpenses
                      id={transaction._id}
                      key={transaction._id}
                    />
                  );
                })}
              </div>
            );
          })
        ) : (
          <div>
            <p className={styles.emptyWarning}>
              История добавлений в хранилище {currentCategory.name} пуста
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ExpenseList;
