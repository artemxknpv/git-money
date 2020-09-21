import { ADD_TRANSACTION } from '../../action-types';

export default transaction => ({
  type: ADD_TRANSACTION,
  payload: {
    transaction,
  },
});
