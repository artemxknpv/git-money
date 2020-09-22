import { takeEvery, call, put } from 'redux-saga/effects';
import { REGISTRATION_STARTED } from '../action-types.js';
import loginStarted from '../actions/authentication/loginStarted.js';
import loginSuccess from '../actions/authentication/loginSuccess.js';
import registrationFailure from '../actions/authentication/registrationFailure';
import registrationSuccess from '../actions/authentication/registrationSuccess';

const registrationFetch = async ({
  firstName,
  lastName,
  email,
  login,
  password,
}) => {
  const response = await fetch('/auth/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, mail: email, login, password }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

function* registrationWorker(action) {
  const { firstName, lastName, email, login, password } = action.payload;
  const response = yield call(registrationFetch, {
    firstName,
    lastName,
    email,
    login,
    password,
  });
  const id = response.id;
  console.log(typeof response);
  if (response?.length) {
    yield put(registrationFailure(response[0].message));
  } else {
    yield put(registrationSuccess(id));
    yield put(loginStarted(login, password));
  }
  // yield put(setUserInfoStarted(id));
}

export default function* registrationWatcher() {
  yield takeEvery(REGISTRATION_STARTED, registrationWorker);
}
