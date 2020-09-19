import { REGISTER_STARTED } from '../../action-types.js';

export default (login, email, password) => ({
  type: REGISTER_STARTED,
  payload: {
    login,
    email,
    password,
  },
});
