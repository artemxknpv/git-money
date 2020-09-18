import * as actionTypes from '../action-types.js';

export default (store = {}, action) => {
  switch (action.type) {
    default:
      return store;
    case actionTypes.ADD_CATEGORY_SUCCESS:
    // TODO
    case actionTypes.ADD_CATEGORY_FAILURE:
    // TODO
    case actionTypes.DELETE_CATEGORY_SUCCESS:
    // TODO
    case actionTypes.DELETE_CATEGORY_FAILURE:
    // TODO
    case actionTypes.RENAME_CATEGORY_SUCCESS:
    // TODO
    case actionTypes.RENAME_CATEGORY_FAILURE:
    // TODO
  }
};
