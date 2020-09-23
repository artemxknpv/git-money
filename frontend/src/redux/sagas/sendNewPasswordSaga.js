import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN_STARTED, SEND_NEW_PASSWORD_START } from '../action-types';
import sendNewPasswordFail from "../actions/sendNewPassword/sendNewPasswordFail";
import closeModalWindowForgotPassword from "../actions/modalWindow/closeModalWindowForgotPassword";
import axios from "axios";
import loginFailure from "../actions/authentication/loginFailure";



const loginFetch = async ({ email }) => {
  const response = await axios.patch('/auth/forgotpassword', {
    email,
  });
  return response.data;
};

function* loginWorker(action) {

  const { email } = action.payload;
  try {
    const response = yield call(loginFetch, { email });
    yield put(closeModalWindowForgotPassword())
  } catch (err){
    yield put(sendNewPasswordFail())
  }
}

export default function* loginWatcher() {
  yield takeEvery(SEND_NEW_PASSWORD_START, loginWorker);
}
