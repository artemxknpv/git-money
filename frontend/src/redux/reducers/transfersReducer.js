import * as actionTypes from '../action-types';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSFERS:
      return action.payload.transfers;
    case actionTypes.DELETE_TRANSFER_SUCCESS:
      return state.filter(
        transaction => transaction._id !== action.payload.idTransaction
      );
    case actionTypes.ADD_TRANSFER_BETWEEN_STORES:
      return [...state, action.payload.transfer];
    default:
      return state;
  }
};
