import * as actionTypes from '../action-types.js';

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOADING_STARTED:
      return true;
    case actionTypes.LOADING_FINISHED:
      return false;
    default:
      return state;
  }
};
