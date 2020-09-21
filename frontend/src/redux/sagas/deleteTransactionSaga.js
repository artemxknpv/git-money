import { takeEvery, put, call } from 'redux-saga/effects';
import { DELETE_TRANSACTION_STARTED } from '../action-types';
import deleteTransactionSuccess from '../actions/deleteTransaction/deleteTransactionSuccess';

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
  const { userId, idTransaction } = action.payload;
  try {
    const response = yield call(deleteTransactionFetch, {
      userId,
      idTransaction,
    });
    yield put(deleteTransactionSuccess(userId, idTransaction));
  } catch (err) {
    console.log('transfer error', err);
  }
  // yield put(transferMoneyStoreSuccess(userId, idTo, idFrom, amount));
}

export default function* transferMoneyStoreWatcher() {
  yield takeEvery(DELETE_TRANSACTION_STARTED, transferMoneyStoreWorker);
}
