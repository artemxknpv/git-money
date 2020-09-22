import { DELETE_INCOME_STARTED } from '../../action-types';

export default (userId, idTransaction, idStore, amount) => ({
  type: DELETE_INCOME_STARTED,
  payload: {
    userId,
    idTransaction,
    idStore,
    amount,
  },
});
