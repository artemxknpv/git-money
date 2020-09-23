import * as actionTypes from '../action-types.js';
const initState = { isOpened: false, type: '', subtype: '' };
export default (state = initState, { type, payload }) => {
  switch (type) {
    case actionTypes.MODAL_CRUD_CATEGORY_OPENED:
      return {
        ...state,
        isOpened: true,
        type: payload.type,
        subtype: payload.subtype,
      };
    case actionTypes.MODAL_CRUD_CATEGORY_CLOSED:
      return initState;
    case actionTypes.LOGOUT_SUCCESS:
      return initState;
    default:
      return state;
  }
};
