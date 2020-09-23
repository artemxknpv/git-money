import React from 'react';
import { PacmanLoader } from 'react-spinners';
import { css } from '@emotion/core';
import Particlesdiv from '../Particles';
import styles from './LoadingPage.module.scss';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #6dc4c4;
`;

const LoadingPage = ({ loading }) => {
  return (
    <>
      <Particlesdiv />
      <div className={styles.container}>
        <p className={styles.loadingText}>Всё нормально, это просто загрузка</p>
        <PacmanLoader
          css={override}
          size={50}
          margin={1}
          color={'#6dc4c4'}
          loading={loading}
        />
      </div>
    </>
  );
};

export default LoadingPage;
