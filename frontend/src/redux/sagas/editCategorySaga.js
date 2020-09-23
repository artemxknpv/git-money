import { takeEvery, put, call } from 'redux-saga/effects';
import { CRUD_NAME_STARTED } from '../action-types';

const editNameFetch = async ({ userId, id, newValue }) => {
  const response = await fetch(`/${userId}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newValue }),
  });
  // const responseJSON = await response.json()
};

function* editCategoryWorker(action) {
  const { userId, id, newValue } = action.payload;
  yield call(editNameFetch, {
    userId,
    id,
    newValue,
  });
  console.log(userId, id, newValue);
}

export default function* editCategoryWatcher() {
  yield takeEvery(CRUD_NAME_STARTED, editCategoryWorker);
}
