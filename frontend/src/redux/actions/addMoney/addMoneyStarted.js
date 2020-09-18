import { ADD_MONEY_STORE_STARTED } from '../../action-types';

export default (id, amount) => ({
  type: ADD_MONEY_STORE_STARTED,
  payload: {
    id,
    amount,
  },
});
