import { takeEvery, put, call } from 'redux-saga/effects';
import { TRANSFER_B_STORES_STARTED } from '../action-types';
import transferMoneyBStoresSuccess from '../actions/transferBetweenStores/transferBStoresSuccess';
import addTransfer from '../actions/transferMoney/addTransferBetweenStores';

const transferMoneyBStoresFetch = async ({ userId, idTo, idFrom, amount }) => {
  const response = await fetch(`/transfer/${userId}/${idTo}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: idFrom, amount: amount }),
  });
  const responseJSON = response.json();
  return responseJSON;
};

function* transferMoneyBStoresWorker(action) {
  const { userId, idTo, idFrom, amount } = action.payload;
  try {
    const response = yield call(transferMoneyBStoresFetch, {
      userId,
      idTo,
      idFrom,
      amount,
    });
    yield put(addTransfer(response));
  } catch (err) {
    console.log('transfer error', err);
  }
  yield put(transferMoneyBStoresSuccess(idTo, idFrom, amount));
}

export default function* transferMoneyBStoresWatcher() {
  yield takeEvery(TRANSFER_B_STORES_STARTED, transferMoneyBStoresWorker);
}
