import { LOGIN_SUCCESS } from '../../action-types.js';

export default id => ({
  type: LOGIN_SUCCESS,
  payload: {
    id,
  },
}); // TODO
