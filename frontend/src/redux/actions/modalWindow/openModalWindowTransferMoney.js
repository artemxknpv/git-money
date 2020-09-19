import { MODAL_TRANSFER_MONEY_OPENED } from '../../action-types.js';

export default (idTo, idFrom) => ({
  type: MODAL_TRANSFER_MONEY_OPENED,
  payload: {
    idTo,
    idFrom,
  },
});
