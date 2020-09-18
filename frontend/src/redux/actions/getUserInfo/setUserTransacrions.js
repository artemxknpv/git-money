import { SET_TRANSACTIONS } from '../../action-types';

export default transactions => ({
  type: SET_TRANSACTIONS,
  payload: {
    transactions,
  },
});
