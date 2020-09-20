import { takeEvery, call, put } from 'redux-saga/effects';
import { LOGIN_STARTED } from '../action-types.js';
import axios from 'axios';
import setUserInfoStarted from '../actions/setUserInfo/setUserInfoStarted.js';
import loginSuccess from '../actions/authentication/loginSuccess.js';
import loginFailure from '../actions/authentication/loginFailure.js';


const loginFetch = async ({ login, password }) => {
  const response = await axios.post('/login', {
    login,
    password,
  });
  return response.data;
};

function* loginWorker(action) {
  const { login, password } = action.payload;
  try {
    const data = yield call(loginFetch, { login, password });
    const id = data.id;
    yield put(setUserInfoStarted(id));
    yield put(loginSuccess(id));
  } catch (err) {
    yield put(loginFailure(err))
  }
}

export default function* loginWatcher() {
  yield takeEvery(LOGIN_STARTED, loginWorker);
}
