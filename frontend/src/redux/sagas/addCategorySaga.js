import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_CATEGORY_STARTED } from '../action-types.js';
import axios from 'axios';
import addCategoryFailure from '../actions/addCategory/addCategoryFailure.js';
import addCategorySuccess from '../actions/addCategory/addCategorySuccess.js';

const addCategoryFetch = async ({ name, value }) => {
  console.log(name, value);
  const response = await axios.put('/5f6461f130b5b80a09c09c6c', {
    type: value,
    name: name,
  });
  console.log(response.data);
  return response.data;
};

function* addCategoryWorker(action) {
  const { name, value } = action.payload;
  const response = yield call(addCategoryFetch, { name, value });
  console.log(response);
  yield put(addCategorySuccess(response));
}

export default function* addCategoryWatcher() {
  yield takeEvery(ADD_CATEGORY_STARTED, addCategoryWorker);
}
