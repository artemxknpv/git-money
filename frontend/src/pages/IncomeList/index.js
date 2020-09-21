import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import TransactionsHistoryIncome from '../../components/TransactionHistoryIncome';
import { StyledHeader } from '../../styled-components/StyledHeader.js';
import styles from './IncomeList.module.scss';
import { AnimateSharedLayout, motion } from 'framer-motion';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const { cat } = useParams();
  const listTransactions = useSelector(state => state.transactions);
  const categories = useSelector(state => state.categories);
  const storeName = categories.filter(category => category.id === cat)[0].name;
  const thisCategoryList = listTransactions.filter(
    transaction => transaction.to === cat
  );

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
          <h2 className={styles.header}>{storeName}</h2>
        </div>
        <p className={styles.editCategory}>Edit category</p>
      </StyledHeader>
      {thisCategoryList.length ? (
        <AnimateSharedLayout>
          <motion.ul layout>
            {thisCategoryList.map(cat => (
              <TransactionsHistoryIncome id={cat._id} key={cat._id} />
            ))}
          </motion.ul>
        </AnimateSharedLayout>
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
