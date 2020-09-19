import { LOGIN_FAILURE } from '../../action-types.js';

export default error => ({
  type: LOGIN_FAILURE,
  payload: error,
  error: true,
});
