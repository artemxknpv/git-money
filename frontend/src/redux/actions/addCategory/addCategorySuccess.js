import { ADD_CATEGORY_SUCCESS } from '../../action-types.js';

export default category => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: {
    category,
  },
});
