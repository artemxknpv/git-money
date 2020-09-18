import { takeEvery, put, call } from 'redux-saga/effects';
import { TRANSFER_MONEY_STORE_STARTED } from '../action-types';
import transferMoneyStoreSuccess from '../actions/transferMoney/transferMoneySuccess';

const transferMoneyStoreFetch = async ({ userId, idTo, idFrom, amount }) => {
  await fetch(`${userId}/${idTo}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: idFrom, amount: amount }),
  });
};

function* transferMoneyStoreWorker(action) {
  const { userId, idTo, idFrom, amount } = action.payload;
  try {
    yield call(transferMoneyStoreFetch, { userId, idTo, idFrom, amount });
  } catch (err) {
    console.log('transfer error', err);
  }
  yield put(transferMoneyStoreSuccess(userId, idTo, idFrom, amount));
}

export default function* transferMoneyStoreWatcher() {
  yield takeEvery(TRANSFER_MONEY_STORE_STARTED, transferMoneyStoreWorker);
}
