import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_CATEGORY_STARTED } from '../action-types.js';
import axios from 'axios';
import addCategorySuccess from '../actions/addCategory/addCategorySuccess.js';
import loadingFinished from '../actions/loadingHandlers/loadingFinished.js';
import loadingStarted from '../actions/loadingHandlers/loadingStarted.js';

const addCategoryFetch = async ({ userId, name, value, iconId, limit }) => {
  const response = await axios.put(`/${userId}`, {
    type: value,
    name,
    iconId,
    limit,
  });
  return response.data;
};

function* addCategoryWorker(action) {
  yield put(loadingStarted());
  const { userId, name, value, iconId, limit } = action.payload;
  const response = yield call(addCategoryFetch, {
    userId,
    name,
    value,
    iconId,
    limit,
  });
  yield put(addCategorySuccess(response));
  yield put(loadingFinished());
}

export default function* addCategoryWatcher() {
  yield takeEvery(ADD_CATEGORY_STARTED, addCategoryWorker);
}
