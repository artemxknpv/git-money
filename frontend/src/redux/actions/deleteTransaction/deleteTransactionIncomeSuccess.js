import { DELETE_INCOME_SUCCESS } from '../../action-types';

export default (userId, idTransaction) => ({
  type: DELETE_INCOME_SUCCESS,
  payload: {
    userId,
    idTransaction,
  },
});
