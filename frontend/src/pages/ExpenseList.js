import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import TransactionHistoryExpenses from '../components/TransactionHistoryExpenses';

const ExpenseList = () => {
  const { cat } = useParams();
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions);
  // const currentIdExpense = useSelector(
  //   state => state.isTransactionHistoryModal.idExpense
  // );
  const currentCategory = useSelector(state => {
    return state.categories.filter(category => {
      return category.id === cat;
    })[0];
  });
  const transactionsToThisExpense = transactions.filter(transaction => {
    return transaction.to === cat;
  });
  return (
    <div>
      <h3>
        <Link to={'/'}>HOME</Link>
      </h3>
      <section>
        <h5>
          История ваших расходов в категории: <br />
          {currentCategory && currentCategory.name}
        </h5>
        {transactionsToThisExpense.length ? (
          transactionsToThisExpense.map(element => {
            return <TransactionHistoryExpenses id={element._id} />;
          })
        ) : (
          <h2>История ваших покупок в данной категории пуста</h2>
        )}
      </section>
    </div>
  );
};

export default ExpenseList;
