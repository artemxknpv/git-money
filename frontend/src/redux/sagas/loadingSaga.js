import { ADD_MONEY_SUCCESS } from '../action-types.js';
import { put, takeEvery } from 'redux-saga/effects';
export default function* loadingWatcher() {
  yield takeEvery(ADD_MONEY_SUCCESS, loadingWorker);
  // yield takeEvery()
}

function* loadingWorker(action) {
  yield put();
}
