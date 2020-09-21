import { all } from 'redux-saga/effects';
import loginWatcher from './loginSaga.js';
import addCategorySaga from './addCategorySaga.js';
import addMoneySaga from './addMoneySaga.js';
import setUserInfoSaga from './setUserInfoSaga';
import deleteCategorySaga from './deleteCategorySaga';
import transferMoneySaga from './transferMoneySaga';
import deleteTransactionSaga from './deleteTransactionSaga';

export default function* () {
  yield all([
    loginWatcher(),
    setUserInfoSaga(),
    addCategorySaga(),
    addMoneySaga(),
    deleteCategorySaga(),
    transferMoneySaga(),
    deleteTransactionSaga(),
  ]);
}
