import { MODAL_TRANSACTION_HISTORY_OPENED } from '../../action-types.js';

export default idExpense => ({
  type: MODAL_TRANSACTION_HISTORY_OPENED,
  payload: {
    idExpense,
  },
});
