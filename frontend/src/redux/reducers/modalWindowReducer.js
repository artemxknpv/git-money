import * as actionTypes from '../action-types.js';

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.MODAL_OPENED:
      return true;
    case actionTypes.MODAL_CLOSED:
      return false;
    default:
      return state;
  }
};
