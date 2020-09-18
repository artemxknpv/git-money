import * as actionTypes from '../action-types.js';

export default (state = { isOpened: false, id: '' }, { type, payload }) => {
  switch (type) {
    case actionTypes.MODAL_OPENED:
      return { isOpened: true, id: payload.id };
    case actionTypes.MODAL_CLOSED:
      return { isOpened: false, id: '' };
    default:
      return state;
  }
};
