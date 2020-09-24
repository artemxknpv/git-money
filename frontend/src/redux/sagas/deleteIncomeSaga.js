import { takeEvery, put, call } from 'redux-saga/effects';
import { DELETE_INCOME_STARTED } from '../action-types';
import deleteIncomeSuccess from '../actions/deleteTransaction/deleteTransactionIncomeSuccess';
import addMoneyCategory from '../actions/addMoney/addMoneySuccess';
import addTotalMoney from '../actions/TotalMoney/addTotalMoney';

const deleteTransactionFetch = async ({ userId, idTransaction }) => {
  console.log(1);
  await fetch(`/${userId}/${idTransaction}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return;
};

function* transferMoneyStoreWorker(action) {
  const { userId, idTransaction, idStore, amount } = action.payload;
  try {
    yield call(deleteTransactionFetch, {
      userId,
      idTransaction,
    });
    console.log('success');
    yield put(deleteIncomeSuccess(userId, idTransaction));
    yield put(addMoneyCategory(idStore, -amount));
    yield put(addTotalMoney(amount));
  } catch (err) {
    console.log('transfer error', err);
  }
}

export default function* transferMoneyStoreWatcher() {
  yield takeEvery(DELETE_INCOME_STARTED, transferMoneyStoreWorker);
}
