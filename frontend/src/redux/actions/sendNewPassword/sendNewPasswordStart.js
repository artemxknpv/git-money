import { SEND_NEW_PASSWORD_START } from '../../action-types';

export default (email) => ({
  type: SEND_NEW_PASSWORD_START,
  payload: {
    email,
  },
});
