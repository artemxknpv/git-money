import { GET_USER_INFO_STARTED } from '../../action-types';

export default userId => ({
  type: GET_USER_INFO_STARTED,
  payload: {
    userId,
  },
});
