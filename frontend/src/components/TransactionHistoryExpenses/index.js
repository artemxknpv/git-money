import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function TransactionsHistory({ id }) {
  const transactions = useSelector(state => state.transactions);
  const store = useSelector(state => state.categories);
  const transaction = transactions.filter(transaction => {
    return transaction._id === id;
  })[0];
  const [prettyTime, setPrettyTime] = useState('');
  const [nameTo, setNameTo] = useState(null);
  const [nameFrom, setNameFrom] = useState(null);
  useEffect(() => {
    setPrettyTime(new Date(transaction.time).toLocaleString());
    setNameTo(
      store.filter(category => {
        return category.id === transaction.to;
      })[0]
    );
    setNameFrom(
      store.filter(category => {
        return category.id === transaction.from;
      })[0]
    );
  }, [transaction]);

  return (
    <span>
      <h3>To {nameTo && nameTo.name}</h3>
      <h2>{transaction && transaction.amount}</h2>
      <h3>From {nameFrom && nameFrom.name}</h3>
      <h3>At time: {prettyTime && prettyTime}</h3>
    </span>
  );
}

export default TransactionsHistory;
