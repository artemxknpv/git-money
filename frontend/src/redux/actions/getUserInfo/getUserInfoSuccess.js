import { GET_USER_INFO_SUCCESS } from '../../action-types';

export default user => ({
  type: GET_USER_INFO_SUCCESS,
  payload: {
    user,
  },
});
