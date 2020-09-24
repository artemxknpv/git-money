import { ADD_MONEY_FAILURE } from '../../action-types.js';

export default error => ({
  type: ADD_MONEY_FAILURE,
  payload: error,
  error: true,
});
