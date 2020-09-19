import { takeEvery, call, put } from 'redux-saga/effects';
import { LOGIN_STARTED } from '../action-types.js';
import axios from 'axios';
import setUserInfoStarted from '../actions/setUserInfo/setUserInfoStarted.js';

export default function* loginWatcher() {
  yield takeEvery(LOGIN_STARTED, loginWorker);
}

function* loginWorker(action) {
  const { login, password } = action;
  try {
    const response = yield call(() => axios.post('/login'), {
      login,
      password,
    });
    const id = response.data.id;
    yield put(setUserInfoStarted(id)); //TODO
  } catch (e) {
    yield put(loginFailure(e));
  }
}
