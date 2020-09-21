import { takeEvery, put, call } from 'redux-saga/effects';
import { SET_USER_INFO_STARTED } from '../action-types';
import setUserInfoSuccess from '../actions/setUserInfo/setUserInfoSuccess';
import setCategories from '../actions/setUserInfo/setUserCategories';
import setTransactions from '../actions/setUserInfo/setUserTransacrions';

const setUserInfofetch = async ({ userId }) => {
  console.log('userId>>>>>>>', userId);
  const response = await fetch(`/${userId}`);
  console.log('response>>>>>>>', response);
  const responseJSON = await response.json();
  console.log('responseJSON>>>>>>>', responseJSON);

  return responseJSON;
};

function* setUserInfoWorker(action) {
  let user, categories, transactions;
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
