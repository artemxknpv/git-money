import * as actionTypes from '../action-types';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSFERS:
      return action.payload.transfers;
    default:
      return state;
  }
};
