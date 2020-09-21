import { REGISTRATION_SUCCESS } from '../../action-types.js';

export default id => ({
  type: REGISTRATION_SUCCESS,
  payload: {
    id,
  },
});
