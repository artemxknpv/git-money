import { takeEvery, put, call } from 'redux-saga/effects';
import { SET_USER_INFO_STARTED } from '../action-types';
import setUserInfoSuccess from '../actions/setUserInfo/setUserInfoSuccess';
import setCategories from '../actions/setUserInfo/setUserCategories';
import setTransactions from '../actions/setUserInfo/setUserTransacrions';
import setTransfers from '../actions/setUserInfo/setUserTransfers';

const setUserInfofetch = async ({ userId }) => {
  const response = await fetch(`/${userId}`);
  const responseJSON = await response.json();
  return responseJSON;
};

function* setUserInfoWorker(action) {
  let user, categories, transactions, transfers;
  try {
    const { userId } = action.payload;
    console.log(userId);
    const userInfo = yield call(setUserInfofetch, { userId });
    user = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      mail: userInfo.mail,
      login: userInfo.login,
      totalMoney: userInfo.totalMoney,
    };
    categories = userInfo.categories;
    transactions = userInfo.transactions;
    transfers = userInfo.transfers;
  } catch (e) {
    console.log('set user info error', e);
  }
  yield put(setCategories(categories));
  yield put(setTransactions(transactions));
  yield put(setTransfers(transfers));
  yield put(setUserInfoSuccess(user));
}

function* setUserInfoWatcher() {
  yield takeEvery(SET_USER_INFO_STARTED, setUserInfoWorker);
}

export default setUserInfoWatcher;
