import * as actionTypes from '../action-types.js';

export default (state = { isOpened: false, type: '' }, { type, payload }) => {
  switch (type) {
    case actionTypes.MODAL_ADD_CATEGORY_OPENED:
      return { isOpened: true, type: payload.type };
    case actionTypes.MODAL_ADD_CATEGORY_CLOSED:
      return { isOpened: false, type: '' };
    default:
      return state;
  }
};
