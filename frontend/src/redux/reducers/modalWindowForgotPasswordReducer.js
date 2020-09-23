import * as actionTypes from '../action-types.js';
const initState = { isOpened: false, email: '' };
export default (state = initState, { type, payload }) => {
  switch (type) {
    case actionTypes.MODAL_FORGOT_PASSWORD_OPENED:
      return { isOpened: true, email: '' };
    case actionTypes.MODAL_FORGOT_PASSWORD_CLOSED:
      return { isOpened: false, email: payload.email};
    case actionTypes.LOGIN_SUCCESS:
      return initState;
    default:
      return state;
  }
};
