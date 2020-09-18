import { ADD_CATEGORY_STARTED } from '../../action-types.js';

export default (userId, name, value) => ({
  type: ADD_CATEGORY_STARTED,
  payload: {
    userId,
    name,
    value,
  },
});
