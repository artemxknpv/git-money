import { takeEvery, call, put } from 'redux-saga/effects';
import { LOGIN_STARTED } from '../action-types.js';
import setUserInfoStarted from '../actions/setUserInfo/setUserInfoStarted.js';
import loginSuccess from '../actions/authentication/loginSuccess.js';
import loginFailure from '../actions/authentication/loginFailure.js';

const loginFetch = async ({ login, password }) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

function* loginWorker(action) {
  const { login, password } = action.payload;
  try {
    const response = yield call(loginFetch, { login, password });
    const id = response.id;
    if (response?.length) {
      yield put(loginFailure(response[0].message));
    } else {
      yield put(setUserInfoStarted(id));
      yield put(loginSuccess(id));
    }
  } catch (err) {
    // yield put(loginFailure(err));
  }
}

export default function* loginWatcher() {
  yield takeEvery(LOGIN_STARTED, loginWorker);
}
