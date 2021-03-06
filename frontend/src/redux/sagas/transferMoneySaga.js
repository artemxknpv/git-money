import { takeEvery, put, call } from 'redux-saga/effects';
import { TRANSFER_MONEY_STORE_STARTED } from '../action-types';
import loadingFinished from '../actions/loadingHandlers/loadingFinished.js';
import loadingStarted from '../actions/loadingHandlers/loadingStarted.js';
import transferMoneyStoreSuccess from '../actions/transferMoney/transferMoneySuccess';
import addTransaction from '../actions/addTransaction/addTransaction';
import addTotalMoney from '../actions/TotalMoney/addTotalMoney';

const transferMoneyStoreFetch = async ({ userId, idTo, idFrom, amount }) => {
  const response = await fetch(`/${userId}/${idTo}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: idFrom, amount: amount }),
  });
  const responseJSON = response.json();
  return responseJSON;
};

function* transferMoneyStoreWorker(action) {
  yield put(loadingStarted());
  const { userId, idTo, idFrom, amount } = action.payload;
  try {
    const response = yield call(transferMoneyStoreFetch, {
      userId,
      idTo,
      idFrom,
      amount,
    });
    yield put(addTransaction(response));
    yield put(addTotalMoney(-amount));
    yield put(transferMoneyStoreSuccess(userId, idTo, idFrom, amount));
  } catch (err) {
    console.log('transfer error', err);
  }
  yield put(loadingFinished());
}

export default function* transferMoneyStoreWatcher() {
  yield takeEvery(TRANSFER_MONEY_STORE_STARTED, transferMoneyStoreWorker);
}
