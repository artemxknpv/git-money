import { ADD_TRANSFER_BETWEEN_STORES } from '../../action-types';

export default transfer => ({
  type: ADD_TRANSFER_BETWEEN_STORES,
  payload: {
    transfer,
  },
});
