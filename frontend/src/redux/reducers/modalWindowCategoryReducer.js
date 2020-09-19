import * as actionTypes from '../action-types.js';
const initState = { isOpened: false, type: '' };
export default (state = initState, { type, payload }) => {
  switch (type) {
    case actionTypes.MODAL_ADD_CATEGORY_OPENED:
      return { isOpened: true, type: payload.type };
    case actionTypes.MODAL_ADD_CATEGORY_CLOSED:
      return { isOpened: false, type: '' };
    case actionTypes.LOGOUT_SUCCESS:
      return initState;
    default:
      return state;
  }
};
