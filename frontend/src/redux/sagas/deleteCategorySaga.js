import { takeEvery, put, call } from 'redux-saga/effects';
import { DELETE_CATEGORY_STARTED } from '../action-types';
import deleteCategorySuccess from '../actions/deleteCategory/deleteCategorySuccess';

const deleteCategoryFetch = async ({ userId, id }) => {
  await fetch(`/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
};

function* deleteCategoryWorker(action) {
  const { userId, id } = action.payload;
  try {
    yield call(deleteCategoryFetch, { userId, id });
    yield put(deleteCategorySuccess(id));
  } catch (err) {
    console.log('delete error', err);
  }
}

function* deleteCategoryWatcher() {
  yield takeEvery(DELETE_CATEGORY_STARTED, deleteCategoryWorker);
}

export default deleteCategoryWatcher;
