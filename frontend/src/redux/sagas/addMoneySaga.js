import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_MONEY_STORE_STARTED } from '../action-types.js';
import addMoneyStoreSuccess from '../actions/addMoney/addMoneySuccess';

const addMoneyStoreFetch = async ({ id, amount }) => {
  await fetch(`/5f6461f130b5b80a09c09c6c/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });
};

function* addMoneyStoreWorker(action) {
  const { id, amount } = action.payload;
  yield call(addMoneyStoreFetch, { id, amount });
  yield put(addMoneyStoreSuccess(id, amount));
}

export default function* addMoneyStoreWatcher() {
  yield takeEvery(ADD_MONEY_STORE_STARTED, addMoneyStoreWorker);
}
