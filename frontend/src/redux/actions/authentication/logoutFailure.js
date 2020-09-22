import { LOGOUT_FAILURE } from '../../action-types.js';

export default error => ({
  type: LOGOUT_FAILURE,
  error: true,
  payload: error,
});
