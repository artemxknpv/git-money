import React from 'react';
import { HashLoader } from 'react-spinners';
import { css } from '@emotion/core';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #6dc4c4;
`;
const InlineLoading = ({ loading }) => {
  return (
    <HashLoader css={override} size={30} color={'#ffffff'} loading={loading} />
  );
};

export default InlineLoading;
