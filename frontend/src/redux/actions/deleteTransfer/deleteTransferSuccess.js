import { DELETE_TRANSFER_SUCCESS } from '../../action-types';

export default (userId, idTransaction) => ({
  type: DELETE_TRANSFER_SUCCESS,
  payload: {
    userId,
    idTransaction,
  },
});
