import { all } from 'redux-saga/effects';
import loginWatcher from './loginSaga.js';
import addCategorySaga from './addCategorySaga.js';
import addMoneySaga from './addMoneySaga.js';
import setUserInfoSaga from './setUserInfoSaga';
import deleteCategorySaga from './deleteCategorySaga';
import transferMoneySaga from './transferMoneySaga';
import registrationWatcher from './registrationSaga.js';
import deleteTransactionSaga from './deleteTransactionSaga';
import logoutSaga from './logoutSaga.js';
import deleteIncomeSaga from './deleteIncomeSaga';
import editCategory from './editNameCategorySaga';

export default function* () {
  yield all([
    registrationWatcher(),
    loginWatcher(),
    setUserInfoSaga(),
    addCategorySaga(),
    addMoneySaga(),
    deleteCategorySaga(),
    transferMoneySaga(),
    deleteTransactionSaga(),
    logoutSaga(),
    deleteIncomeSaga(),
    editCategory(),
  ]);
}
