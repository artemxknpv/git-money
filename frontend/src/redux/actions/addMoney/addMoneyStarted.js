import { ADD_MONEY_STORE_STARTED } from '../../action-types';

export default (userId, id, amount) => ({
  type: ADD_MONEY_STORE_STARTED,
  payload: {
    userId,
    id,
    amount,
  },
});
