import { takeEvery, put, call } from 'redux-saga/effects';
import { DELETE_CATEGORY_STARTED } from '../action-types';
import deleteCategorySuccess from '../actions/deleteCategory/deleteCategorySuccess';

import axios from 'axios';

const deleteCategoryFecth = async id => {
  // await axios.delete('/5f6461f130b5b80a09c09c6c', {
  //   data: { id },
  // });
  await fetch('/5f6461f130b5b80a09c09c6c', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
};

function* deleteCategoryWorker(action) {
  console.log('!');
  try {
    yield call(deleteCategoryFecth, action.payload.id);
    yield put(deleteCategorySuccess(action.payload.id));
  } catch (err) {
    console.log('delete error', err);
  }
}

function* deleteCategoryWatcher() {
  yield takeEvery(DELETE_CATEGORY_STARTED, deleteCategoryWorker);
}

export default deleteCategoryWatcher;
