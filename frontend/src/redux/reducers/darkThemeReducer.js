import * as actionTypes from '../action-types.js';

export default (state = false, { type }) => {
  switch (type) {
    case actionTypes.DARK_THEME_TRUE:
      return true;
    case actionTypes.DARK_THEME_FALSE:
      return false;
    default:
      return state;
  }
};
