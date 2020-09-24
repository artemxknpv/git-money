import * as actionTypes from '../action-types';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSFERS:
      return action.payload.transfers;
    default:
      return state;
    case actionTypes.ADD_TRANSFER_BETWEEN_STORES:
      return [...state, action.payload.transfer];
  }
};
