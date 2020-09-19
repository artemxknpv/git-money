import { TRANSFER_MONEY_STORE_STARTED } from '../../action-types';

export default (userId, idTo, idFrom, amount) => ({
  type: TRANSFER_MONEY_STORE_STARTED,
  payload: {
    userId,
    idTo,
    idFrom,
    amount,
  },
});
