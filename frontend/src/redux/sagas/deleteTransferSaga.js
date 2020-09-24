import { takeEvery, put, call } from 'redux-saga/effects';
import { DELETE_TRANSFER_STARTED } from '../action-types';
import deleteTransferSuccess from '../actions/deleteTransfer/deleteTransferSuccess';
import addMoneyCategory from '../actions/addMoney/addMoneySuccess';

const deleteTransferFetch = async ({ userId, idTransfer }) => {
  console.log(userId, idTransfer);
  await fetch(`/transfer/${userId}/${idTransfer}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return;
};

function* transferMoneyStoreWorker(action) {
  const { userId, idTransfer, idTo, idFrom, amount } = action.payload;
  try {
    yield call(deleteTransferFetch, {
      userId,
      idTransfer,
    });
    yield put(deleteTransferSuccess(userId, idTransfer));
    yield put(addMoneyCategory(idFrom, amount));
    yield put(addMoneyCategory(idTo, -amount));
  } catch (err) {
    console.log('transfer error', err);
  }
}

export default function* transferMoneyStoreWatcher() {
  yield takeEvery(DELETE_TRANSFER_STARTED, transferMoneyStoreWorker);
}
