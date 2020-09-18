import { ADD_MONEY_STORE_SUCCESS } from '../../action-types';

export default (id, amount) => ({
  type: ADD_MONEY_STORE_SUCCESS,
  payload: {
    id,
    amount,
  },
});
