import * as actionTypes from '../action-types.js';

export default (store = {}, action) => {
  switch (action.type) {
    default:
      return store;
    case actionTypes.ADD_MONEY_SUCCESS:
    // TODO
    case actionTypes.ADD_MONEY_FAILURE:
    // TODO
  }
};
