import { takeEvery, put, call } from 'redux-saga/effects';
import { SET_USER_INFO_STARTED } from '../action-types';
import setUserInfoSuccess from '../actions/setUserInfo/setUserInfoSuccess';
import setCategories from '../actions/setUserInfo/setUserCategories';
import setTransactions from '../actions/setUserInfo/setUserTransacrions';
import axios from 'axios';

const setUserInfofetch = async ({ userId }) => {
  console.log('>>>>>>>>1', userId);
  const response = await fetch(`/${userId}`);
  console.log('>>>>>>>>2', response);
  const responseJSON = await response.json();
  console.log('>>>>>>>>3', responseJSON);

  console.log(responseJSON);

  // const response = await axios.get(`/${userId}`);
  // const response = await axios.get(`/5f6461f130b5b80a09c09c6c`);
  return responseJSON;
};

function* setUserInfoWorker(action) {
  let user, categories, transactions;

  try {
    const { userId } = action.payload;
    console.log(userId);
    const userInfo = yield call(setUserInfofetch, { userId });
    console.log('>>>>>>>', userInfo);
    user = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      mail: userInfo.mail,
      login: userInfo.login,
      totalMoney: userInfo.totalMoney,
    };
    categories = userInfo.categories;
    transactions = userInfo.transactions;
  } catch (e) {
    console.log('set user info error', e);
  }
  console.log(user);

  yield put(setUserInfoSuccess(user));
  yield put(setCategories(categories));
  yield put(setTransactions(transactions));
}

function* setUserInfoWatcher() {
  yield takeEvery(SET_USER_INFO_STARTED, setUserInfoWorker);
}

export default setUserInfoWatcher;
