import { SET_TRANSFERS } from '../../action-types';

export default transfers => ({
  type: SET_TRANSFERS,
  payload: {
    transfers,
  },
});
