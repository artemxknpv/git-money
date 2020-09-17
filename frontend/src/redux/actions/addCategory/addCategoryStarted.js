import { ADD_CATEGORY_STARTED } from '../../action-types.js';

export default title => ({
  type: ADD_CATEGORY_STARTED,
  payload: {
    title,
  },
});
