import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_CATEGORY_STARTED } from '../action-types.js';
import addCategoryFailure from '../actions/addCategory/addCategoryFailure.js';
import addCategorySuccess from '../actions/addCategory/addCategorySuccess.js';

export default function* addMoneyWatcher() {
  yield takeEvery(ADD_CATEGORY_STARTED, addMoneyWorker);
}

function* addMoneyWorker(action) {
  const { id, sum } = action.payload;
  try {
    //  TODO: фиктивный запрос в базу, потом исправить на нормальный
    yield put(addCategorySuccess(id, sum));
  } catch (e) {
    yield put(addCategoryFailure(e));
  }
}
