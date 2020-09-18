import * as actionTypes from '../action-types.js';

export default (store = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSACTIONS:
      return action.payload.transactions;
    case actionTypes.ADD_MONEY_SUCCESS:
    // TODO
    case actionTypes.ADD_MONEY_FAILURE:
    // TODO
    default:
      return store;
  }
};
