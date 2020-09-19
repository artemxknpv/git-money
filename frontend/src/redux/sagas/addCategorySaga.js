import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_CATEGORY_STARTED } from '../action-types.js';
import axios from 'axios';
import addCategorySuccess from '../actions/addCategory/addCategorySuccess.js';

const addCategoryFetch = async ({ userId, name, value }) => {
  const response = await axios.put(`/${userId}`, {
    type: value,
    name: name,
  });
  console.log(response.data);
  return response.data;
};

function* addCategoryWorker(action) {
  const { userId, name, value } = action.payload;
  const response = yield call(addCategoryFetch, { userId, name, value });
  console.log(response);
  yield put(addCategorySuccess(response));
}

export default function* addCategoryWatcher() {
  yield takeEvery(ADD_CATEGORY_STARTED, addCategoryWorker);
}
