import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TransactionsHistoryIncome from '../components/TransactionHistoryIncome';

const IncomeList = () => {
  const { cat } = useParams();
  const listTransactions = useSelector(state => state.transactions);
  const thisCategoryList = listTransactions.filter(
    transaction => transaction.to === cat
  );
  console.log(thisCategoryList);
  return (
    <div>
      <p>Привет {cat ?? 'her'}</p>
      <ul>
        {thisCategoryList &&
          thisCategoryList.map(cat => (
            <TransactionsHistoryIncome id={cat._id} />
          ))}
      </ul>
    </div>
  );
};

export default IncomeList;
