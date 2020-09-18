import * as actionTypes from '../action-types.js';

export default (store = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO_SUCCESS:
      return action.payload.user;
    default:
      return store;
    // case actionTypes.ADD_CATEGORY_SUCCESS:
    // // TODO
    // case actionTypes.ADD_CATEGORY_FAILURE:
    // // TODO
    // case actionTypes.DELETE_CATEGORY_SUCCESS:
    // // TODO
    // case actionTypes.DELETE_CATEGORY_FAILURE:
    // // TODO
    // case actionTypes.RENAME_CATEGORY_SUCCESS:
    // // TODO
    // case actionTypes.RENAME_CATEGORY_FAILURE:
    // TODO
  }
};
