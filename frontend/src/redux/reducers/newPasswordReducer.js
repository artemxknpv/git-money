import * as actionTypes from '../action-types.js';
const initState = { isInvalid: false, email: '' };
export default (state = initState, { type, payload }) => {
  switch (type) {
    case actionTypes.SEND_NEW_PASSWORD_START:
      return { email: payload.email, isInvalid: false };
    case actionTypes.SEND_NEW_PASSWORD_FAIL:
      return { ...state, isInvalid: true};
    case actionTypes.SEND_NEW_PASSWORD_END:
      return {...state, isInvalid: false}
    default:
      return state;
  }
};
