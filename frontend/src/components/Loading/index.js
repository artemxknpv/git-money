import React from 'react';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <p className={styles.loaderText}>Подгружаем данные...</p>
      <SkeletonLoader
        width={'30%'}
        style={{ margin: 'auto', marginTop: '1rem' }}
      />
      <SkeletonLoader
        width={'30%'}
        style={{ margin: 'auto', marginTop: '1rem' }}
      />
      <SkeletonLoader
        width={'30%'}
        style={{ margin: 'auto', marginTop: '1rem' }}
      />
      <SkeletonLoader
        width={'30%'}
        style={{ margin: 'auto', marginTop: '1rem' }}
      />
    </div>
  );
};

export default Loading;
