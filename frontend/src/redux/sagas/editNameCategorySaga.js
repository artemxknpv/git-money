import { takeEvery, put, call } from 'redux-saga/effects';
import { CRUD_NAME_STARTED } from '../action-types';
import { CRUD_ICON_STARTED } from '../action-types';
import editCategoryName from '../actions/crud/editNameCategorySuccess';
import editCategoryIcon from '../actions/crud/editIconCategorySuccess';
import loadingFinished from '../actions/loadingHandlers/loadingFinished.js';
import loadingStarted from '../actions/loadingHandlers/loadingStarted.js';

const editNameFetch = async ({ userId, id, newValue }) => {
  const response = await fetch(`/${userId}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newValue: newValue, whatToEdit: 'name' }),
  });
  // const responseJSON = await response.json()
};

const editIconFetch = async ({ userId, id, newValue }) => {
  const response = await fetch(`/${userId}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newValue: newValue, whatToEdit: 'icon' }),
  });
};

function* editCategoryNameWorker(action) {
  yield put(loadingStarted());
  const { userId, id, newValue } = action.payload;
  yield call(editNameFetch, {
    userId,
    id,
    newValue,
  });
  yield put(editCategoryName(id, newValue));
  yield put(loadingFinished());
}

function* editCategoryIconWorker(action) {
  yield put(loadingStarted());

  const { userId, id, newValue } = action.payload;
  yield call(editIconFetch, {
    userId,
    id,
    newValue,
  });
  yield put(editCategoryIcon(id, newValue));
  yield put(loadingFinished());
}

export default function* editCategoryWatcher() {
  yield takeEvery(CRUD_NAME_STARTED, editCategoryNameWorker);
  yield takeEvery(CRUD_ICON_STARTED, editCategoryIconWorker);
}
