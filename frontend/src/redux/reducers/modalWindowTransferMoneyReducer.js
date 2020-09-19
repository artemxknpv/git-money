import * as actionTypes from '../action-types.js';

export default (
  state = { isOpened: false, idTo: '', idFrom: '' },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.MODAL_TRANSFER_MONEY_OPENED:
      return { isOpened: true, idTo: payload.idTo, idFrom: payload.idFrom };
    case actionTypes.MODAL_TRANSFER_MONEY_CLOSED:
      return { isOpened: false, idTo: '', idFrom: '' };
    default:
      return state;
  }
};
