import { SET_USER_INFO_SUCCESS } from '../../action-types';

export default user => ({
  type: SET_USER_INFO_SUCCESS,
  payload: {
    user,
  },
});
