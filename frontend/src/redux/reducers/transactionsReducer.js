import * as actionTypes from '../action-types.js';

export default (store = [], action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSACTIONS:
      return action.payload.transactions;
    case actionTypes.ADD_TRANSACTION:
      return [...store, action.payload.transaction];
    default:
      return store;
  }
};
