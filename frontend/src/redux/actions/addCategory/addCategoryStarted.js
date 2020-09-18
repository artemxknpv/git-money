import { ADD_CATEGORY_STARTED } from '../../action-types.js';

export default (name, value) => ({
  type: ADD_CATEGORY_STARTED,
  payload: {
    name,
    value,
  },
});
