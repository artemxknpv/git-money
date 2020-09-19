import { takeEvery, call, put } from 'redux-saga/effects';
import { LOGIN_STARTED } from '../action-types.js';
import axios from 'axios';
import setUserInfoStarted from '../actions/setUserInfo/setUserInfoStarted.js';
import loginSuccess from '../actions/authentication/loginSuccess.js';

const loginFetch = async ({ login, password }) => {
  const response = await axios.post('/login', {
    login,
    password,
  });
  console.log(response);

  return response.data;
};

function* loginWorker(action) {
  const { login, password } = action.payload;
  try {
    const data = yield call(loginFetch, { login, password });
    console.log(data);
    const id = data.id;
    yield put(loginSuccess(id));
    yield put(setUserInfoStarted(id));
  } catch (err) {
    console.log('ошибка логинизации', err);
    // yield put(loginFailure(e));
  }
}

export default function* loginWatcher() {
  yield takeEvery(LOGIN_STARTED, loginWorker);
}
