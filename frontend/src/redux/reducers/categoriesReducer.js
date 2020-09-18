import * as actionTypes from '../action-types.js';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return action.payload.categories;
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return state.filter(category => category.id !== action.payload.id);
    case actionTypes.ADD_CATEGORY_SUCCESS:
      return [...state, action.payload.category];
    default:
      return state;
    // TODO
    // case actionTypes.ADD_CATEGORY_FAILURE:
    // case actionTypes.DELETE_CATEGORY_FAILURE:
    // // TODO
    // case actionTypes.RENAME_CATEGORY_SUCCESS:
    // // TODO
    // case actionTypes.RENAME_CATEGORY_FAILURE:
    // // TODO
  }
};
