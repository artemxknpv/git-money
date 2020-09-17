import { ADD_CATEGORY_SUCCESS } from '../../action-types.js';

export default title => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: {
    title,
  },
});
