import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_CATEGORY_STARTED } from '../action-types.js';
import addCategoryFailure from '../actions/addCategory/addCategoryFailure.js';
import addCategorySuccess from '../actions/addCategory/addCategorySuccess.js';

export default function* addCategoryWatcher() {
  yield takeEvery(ADD_CATEGORY_STARTED, addCategoryWorker);
}

function* addCategoryWorker(action) {
  const { title } = action.payload;
  try {
    //  TODO: фиктивный запрос в базу, потом исправить на нормальный
    yield put(addCategorySuccess(title));
  } catch (e) {
    yield put(addCategoryFailure(e));
  }
}
