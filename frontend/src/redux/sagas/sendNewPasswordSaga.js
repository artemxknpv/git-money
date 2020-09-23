import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN_STARTED, SEND_NEW_PASSWORD_START } from '../action-types';
import sendNewPasswordFail from "../actions/sendNewPassword/sendNewPasswordFail";
import closeModalWindowForgotPassword from "../actions/modalWindow/closeModalWindowForgotPassword";
import axios from "axios";



const forgotPasswordFetch = async ({ email }) => {
  const response = await axios.patch('/auth/forgotpassword', {
    email,
  });
  return response.data;
};

function* forgotPasswordWorker(action) {

  const { email } = action.payload;
  try {
    const response = yield call(forgotPasswordFetch, { email });
    yield put(closeModalWindowForgotPassword())
  } catch (err){
    yield put(sendNewPasswordFail())
  }
}

export default function* forgotPasswordWatcher() {
  yield takeEvery(SEND_NEW_PASSWORD_START, forgotPasswordWorker);
}
