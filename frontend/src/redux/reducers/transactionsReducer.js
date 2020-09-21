import * as actionTypes from '../action-types.js';

export default (store = [], action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSACTIONS:
      return action.payload.transactions;
    case actionTypes.ADD_TRANSACTION:
      return [...store, action.payload.transaction];
    case actionTypes.DELETE_TRANSACTION_SUCCESS:
      return store.filter(
        transaction => transaction._id !== action.payload.idTransaction
      );
    default:
      return store;
  }
};
