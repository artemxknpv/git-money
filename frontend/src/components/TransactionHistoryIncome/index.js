import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function TransactionsHistoryIncome({ id }) {
  console.log(id);
  const transactions = useSelector(state => state.transactions);
  const transaction = transactions.filter(transaction => {
    return transaction._id === id;
  })[0];
  const [prettyTime, setPrettyTime] = useState('');
  useEffect(() => {
    setPrettyTime(new Date(transaction.time).toLocaleString());
  }, [transaction]);

  return (
    <span>
      <div style={{ display: 'flex' }}>
        <h2 style={{ margin: '20px' }}>
          ${transaction && transaction.amount}{' '}
        </h2>
        <h2 style={{ margin: '20px' }}>At time: {prettyTime && prettyTime}</h2>
      </div>
    </span>
  );
}

export default TransactionsHistoryIncome;
