import { takeEvery, put, call } from 'redux-saga/effects';
import { DELETE_TRANSACTION_STARTED } from '../action-types';
import deleteTransactionSuccess from '../actions/deleteTransaction/deleteTransactionSuccess';
import addMoneyCategory from '../actions/addMoney/addMoneySuccess';
import addTotalMoney from '../actions/TotalMoney/addTotalMoney';

const deleteTransactionFetch = async ({ userId, idTransaction }) => {
  console.log(userId, idTransaction);
  const response = await fetch(`${userId}/${idTransaction}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return;
};

function* transferMoneyStoreWorker(action) {
  const { userId, idTransaction, idStore, idExpense, amount } = action.payload;
  console.log(userId, idTransaction, idStore, idExpense, amount);
  try {
    const response = yield call(deleteTransactionFetch, {
      userId,
      idTransaction,
    });
    yield put(deleteTransactionSuccess(userId, idTransaction));
    yield put(addMoneyCategory(idStore, amount));
    yield put(addTotalMoney(amount));
    yield put(addMoneyCategory(idExpense, -amount));
  } catch (err) {
    console.log('transfer error', err);
  }
}

export default function* transferMoneyStoreWatcher() {
  yield takeEvery(DELETE_TRANSACTION_STARTED, transferMoneyStoreWorker);
}
