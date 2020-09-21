import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TransactionsHistoryIncome from '../components/TransactionHistoryIncome';
import TransacrionHistoryExpense from '../components/TransactionHistoryExpenses';

const IncomeList = () => {
  const { cat } = useParams();
  const listTransactions = useSelector(state => state.transactions);
  const categories = useSelector(state => state.categories);
  const storeName = categories.filter(category => category.id === cat)[0].name;
  const thisCategoryList = listTransactions.filter(
    transaction => transaction.to === cat
  );
  const thisCategorySpenditureList = listTransactions.filter(
    transaction => transaction.from === cat
  );
  // const totalArrayIncome = [...thisCategoryList, ...thisCategorySpenditureList];
  // console.log(totalArrayIncome);
  console.log(thisCategorySpenditureList);
  return (
    <div>
      <h2>Привет это категория {storeName}</h2>
      <h3>
        <Link to={'/'}>HOME</Link>
      </h3>
      {thisCategoryList.length ? (
        thisCategoryList.map(cat => <TransactionsHistoryIncome id={cat._id} />)
      ) : (
        <h3>История добавлений в хранилище пустая</h3>
      )}
    </div>
  );
};

export default IncomeList;
