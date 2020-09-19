import { SET_USER_INFO_STARTED } from '../../action-types';

export default userId => ({
  type: SET_USER_INFO_STARTED,
  payload: {
    userId,
  },
});
