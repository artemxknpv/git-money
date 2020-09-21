import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import TransactionsHistoryIncome from '../../components/TransactionHistoryIncome';
import { StyledHeader } from '../../styled-components/StyledHeader.js';
import styles from './Income.module.scss';
import { motion } from 'framer-motion';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);

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
        style={{ margin: 'auto', marginTop: '10rem' }}
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
    <>
      <StyledHeader>
        <h2 className={styles.header}>{storeName}</h2>
        <span>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            HOME
          </Link>
        </span>
      </StyledHeader>
      {thisCategoryList.length ? (
        <motion.ul>
          {thisCategoryList.map(cat => (
            <TransactionsHistoryIncome id={cat._id} key={cat._id} />
          ))}
        </motion.ul>
      ) : (
        <h3>История добавлений в хранилище пуста</h3>
      )}
    </>
  );
};

export default Index;
