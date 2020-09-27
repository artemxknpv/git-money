import { TRANSFER_B_STORES_SUCCESS } from '../../action-types';

export default (idTo, idFrom, amount) => ({
  type: TRANSFER_B_STORES_SUCCESS,
  payload: {
    idTo,
    idFrom,
    amount,
  },
});
