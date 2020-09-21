import { DELETE_TRANSACTION_STARTED } from '../../action-types';

export default (userId, idTransaction) => ({
  type: DELETE_TRANSACTION_STARTED,
  payload: {
    userId,
    idTransaction,
  },
});
