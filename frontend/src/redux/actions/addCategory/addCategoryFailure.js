import { ADD_CATEGORY_FAILURE } from '../../action-types.js';

export default error => ({
  type: ADD_CATEGORY_FAILURE,
  payload: error,
  error: true,
});
