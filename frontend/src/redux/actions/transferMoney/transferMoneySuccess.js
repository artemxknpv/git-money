import { TRANSFER_MONEY_STORE_SUCCESS } from '../../action-types';

export default (userId, idTo, idFrom, amount) => ({
  type: TRANSFER_MONEY_STORE_SUCCESS,
  payload: {
    userId,
    idTo,
    idFrom,
    amount,
  },
});
