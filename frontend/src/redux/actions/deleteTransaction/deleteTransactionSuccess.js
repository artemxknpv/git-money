import { DELETE_TRANSACTION_SUCCESS } from '../../action-types';

export default (userId, idTransaction) => ({
  type: DELETE_TRANSACTION_SUCCESS,
  payload: {
    userId,
    idTransaction,
  },
});
