import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_MONEY_STORE_STARTED } from '../action-types.js';
import addMoneyStoreSuccess from '../actions/addMoney/addMoneySuccess';

const addMoneyStoreFetch = async ({ userId, id, amount }) => {
  await fetch(`/${userId}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });
};

function* addMoneyStoreWorker(action) {
  const { userId, id, amount } = action.payload;
  yield call(addMoneyStoreFetch, { userId, id, amount });
  yield put(addMoneyStoreSuccess(id, amount));
}

export default function* addMoneyStoreWatcher() {
  yield takeEvery(ADD_MONEY_STORE_STARTED, addMoneyStoreWorker);
}
