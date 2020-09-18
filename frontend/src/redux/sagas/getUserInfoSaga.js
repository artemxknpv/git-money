import { takeEvery, put, call } from 'redux-saga/effects';
import { GET_USER_INFO_STARTED } from '../action-types';
import getUserInfoSuccess from '../actions/getUserInfo/getUserInfoSuccess';
import setCategories from '../actions/getUserInfo/setUserCategories';
import setTransactions from '../actions/getUserInfo/setUserTransacrions';
import axios from 'axios';

const getUserInfofetch = async userId => {
  const response = await axios.get(`/${userId}`);
  return response.data;
};

function* getUserInfoWorker(action) {
  const { userId } = action.payload;
  const userInfo = yield call(getUserInfofetch, userId);
  const user = { _id: userInfo._id, totalMoney: userInfo.totalMoney };
  const categories = userInfo.categories;
  const transactions = userInfo.transactions;
  yield put(getUserInfoSuccess(user));
  yield put(setCategories(categories));
  yield put(setTransactions(transactions));
}

function* getUserInfoWatcher() {
  yield takeEvery(GET_USER_INFO_STARTED, getUserInfoWorker);
}

export default getUserInfoWatcher;
