import * as actionTypes from '../action-types.js';

export default (
  state = { isOpened: false, idExpense: '' },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.MODAL_TRANSACTION_HISTORY_OPENED:
      return { isOpened: false, idExpense: payload.idExpense };
    case actionTypes.MODAL_TRANSACTION_HISTORY_CLOSED:
      return { isOpened: false, idExpense: '' };
    default:
      return state;
  }
};
