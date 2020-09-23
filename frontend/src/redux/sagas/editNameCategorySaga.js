import { takeEvery, put, call } from 'redux-saga/effects';
import { CRUD_NAME_STARTED } from '../action-types';
import { CRUD_ICON_STARTED } from '../action-types';

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
  const { userId, id, newValue } = action.payload;
  yield call(editNameFetch, {
    userId,
    id,
    newValue,
  });
}

function* editCategoryIconWorker(action) {
  const { userId, id, newValue } = action.payload;
  yield call(editIconFetch, {
    userId,
    id,
    newValue,
  });
}

export default function* editCategoryWatcher() {
  yield takeEvery(CRUD_NAME_STARTED, editCategoryNameWorker);
  yield takeEvery(CRUD_ICON_STARTED, editCategoryIconWorker);
}
