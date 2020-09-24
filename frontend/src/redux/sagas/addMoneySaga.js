import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_MONEY_STORE_STARTED } from '../action-types.js';
import addMoneyFailure from '../actions/addMoney/addMoneyFailure.js';
import addMoneyStoreSuccess from '../actions/addMoney/addMoneySuccess';
import addTransaction from '../actions/addTransaction/addTransaction';
import loadingFinished from '../actions/loadingHandlers/loadingFinished.js';
import loadingStarted from '../actions/loadingHandlers/loadingStarted.js';
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
  console.log(response);
  if (response.status === 401) {
    responseJSON.error = true;
    return responseJSON;
  }
  console.log(responseJSON);
  return responseJSON;
};

function* addMoneyStoreWorker(action) {
  yield put(loadingStarted());
  const { userId, id, amount } = action.payload;
  try {
    const transaction = yield call(addMoneyStoreFetch, { userId, id, amount });
    if (transaction.error === true) {
      console.log(transaction.message);
    } else {
      console.log(123456);
      yield put(addTransaction(transaction));
      yield put(addTotalMoney(amount));
      yield put(addMoneyStoreSuccess(id, amount));
    }
  } catch (err) {
    yield put(addMoneyFailure(err));
  }
  // yield put(loadingFinished());
}

export default function* addMoneyStoreWatcher() {
  yield takeEvery(ADD_MONEY_STORE_STARTED, addMoneyStoreWorker);
}
