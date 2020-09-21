import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_MONEY_STORE_STARTED } from '../action-types.js';
import addMoneyStoreSuccess from '../actions/addMoney/addMoneySuccess';
import addTransaction from '../actions/addTransaction/addTransaction';
import addTotalMoney from '../actions/TotalMoney/addTotalMoney.js';

const addMoneyStoreFetch = async ({ userId, id, amount }) => {
  const response = await fetch(`/${userId}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

function* addMoneyStoreWorker(action) {
  const { userId, id, amount } = action.payload;
  try {
    const transaction = yield call(addMoneyStoreFetch, { userId, id, amount });
    yield put(addTransaction(transaction));
    yield put(addTotalMoney(amount));
  } catch (err) {
    console.log('add money error', err);
  }
  yield put(addMoneyStoreSuccess(id, amount));
}

export default function* addMoneyStoreWatcher() {
  yield takeEvery(ADD_MONEY_STORE_STARTED, addMoneyStoreWorker);
}
