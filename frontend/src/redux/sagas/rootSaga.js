import { all } from 'redux-saga/effects';
import addCategorySaga from './addCategorySaga.js';
import addMoneySaga from './addMoneySaga.js';

export default function* () {
  yield all([addCategorySaga(), addMoneySaga()]);
}
