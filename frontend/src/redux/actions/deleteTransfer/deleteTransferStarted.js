import { DELETE_TRANSFER_STARTED } from '../../action-types';

export default (userId, idTransfer, idTo, idFrom, amount) => ({
  type: DELETE_TRANSFER_STARTED,
  payload: {
    userId,
    idTransfer,
    idTo,
    idFrom,
    amount,
  },
});
