import { REGISTRATION_FAILURE } from '../../action-types.js';

export default error => ({
  type: REGISTRATION_FAILURE,
  payload: error,
  error: true,
});
