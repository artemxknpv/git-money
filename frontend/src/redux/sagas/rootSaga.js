import { all } from 'redux-saga/effects';
import addCategorySaga from './addCategorySaga.js';
import addMoneySaga from './addMoneySaga.js';
import setUserInfoSaga from './setUserInfoSaga';
import deleteCategorySaga from './deleteCategorySaga';

export default function* () {
  yield all([
    setUserInfoSaga(),
    addCategorySaga(),
    addMoneySaga(),
    deleteCategorySaga(),
  ]);
}
