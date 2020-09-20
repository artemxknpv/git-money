import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function TransactionsHistory({ id }) {
  const transactions = useSelector(state => state.transactions);
  const transaction = transactions.filter(transaction => {
    return transaction._id === id;
  })[0];
  return (
    <span>
      <h3>From something</h3>
      <h2>{transaction && transaction.amount}</h2>
      <h3>To something</h3>
    </span>
  );
}

export default TransactionsHistory;
