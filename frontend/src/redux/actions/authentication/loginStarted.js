import { LOGIN_STARTED } from '../../action-types.js';

export default (login, password) => ({
  type: LOGIN_STARTED,
  payload: {
    login,
    password,
  },
});
