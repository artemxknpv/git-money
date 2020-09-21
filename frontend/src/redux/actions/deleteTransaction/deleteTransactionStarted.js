import { DELETE_TRANSACTION_STARTED } from '../../action-types';

export default (userId, idTransaction, idStore, idExpense, amount) => ({
  type: DELETE_TRANSACTION_STARTED,
  payload: {
    userId,
    idTransaction,
    idStore,
    idExpense,
    amount,
  },
});
