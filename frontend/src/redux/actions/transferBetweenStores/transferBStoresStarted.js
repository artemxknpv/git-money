import { TRANSFER_B_STORES_STARTED } from '../../action-types';

export default (userId, idTo, idFrom, amount) => ({
  type: TRANSFER_B_STORES_STARTED,
  payload: {
    userId,
    idTo,
    idFrom,
    amount,
  },
});
