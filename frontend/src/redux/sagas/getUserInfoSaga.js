import { takeEvery, put, call } from 'redux-saga/effects';
import { GET_USER_INFO_STARTED } from '../action-types';
import getUserInfoSuccess from '../actions/getUserInfo/getUserInfoSuccess';
import axios from 'axios';

const getUserInfofetch = async () => {
  const response = await axios.get('/5f6461f130b5b80a09c09c6c');
  console.log(response);
  return response.data;
};

function* getUserInfoWorker() {
  console.log(1);
  const userInfo = yield call(getUserInfofetch);
  console.log(userInfo);
  yield put(getUserInfoSuccess(userInfo));
}

function* getUserInfoWatcher() {
  yield takeEvery(GET_USER_INFO_STARTED, getUserInfoWorker);
}

export default getUserInfoWatcher;
