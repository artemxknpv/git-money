import * as actionTypes from '../action-types.js';
const initState = { isOpened: false, id: '' };
export default (state = initState, { type, payload }) => {
  switch (type) {
    case actionTypes.MODAL_OPENED:
      return { isOpened: true, id: payload.id };
    case actionTypes.MODAL_CLOSED:
      return { isOpened: false, id: '' };
    case actionTypes.LOGOUT_SUCCESS:
      return initState;
    default:
      return state;
  }
};
