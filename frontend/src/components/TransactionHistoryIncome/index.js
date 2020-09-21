import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

function TransactionsHistoryIncome({ id }) {
  const transactions = useSelector(state => state.transactions);
  const transaction = transactions.filter(
    transaction => transaction._id === id
  )[0];
  const [prettyTime, setPrettyTime] = useState('');
  useEffect(() => {
    setPrettyTime(new Date(transaction.time).toLocaleString());
  }, [transaction]);

  return (
    <li>
      <TransactionItemDiv>
        <span>
          <div style={{ display: 'flex' }}>
            <h2 style={{ margin: '20px' }}>
              ${transaction && transaction.amount}
            </h2>
            <h2 style={{ margin: '20px' }}>
              At time: {prettyTime && prettyTime}
            </h2>
          </div>
        </span>
      </TransactionItemDiv>
    </li>
  );
}

const TransactionItemDiv = styled(motion.div)`
  border: 1px solid #333333;
`;

export default TransactionsHistoryIncome;
