import { takeEvery, call, put } from 'redux-saga/effects';
import { LOGOUT_STARTED } from '../action-types.js';
import axios from 'axios';
import logoutFailure from '../actions/authentication/logoutFailure.js';
import logoutSuccess from '../actions/authentication/logoutSuccess.js';

export default function* logoutWatcher() {
  yield takeEvery(LOGOUT_STARTED, logoutWorker);
}

function* logoutWorker() {
  try {
    yield call(() => axios.get('/auth/logout'));
    yield put(logoutSuccess());
  } catch (e) {
    console.log('error');
    yield put(logoutFailure());
  }
}
