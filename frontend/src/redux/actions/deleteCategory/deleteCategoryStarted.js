import { DELETE_CATEGORY_STARTED } from '../../action-types';

export default (userId, id) => ({
  type: DELETE_CATEGORY_STARTED,
  payload: {
    userId,
    id,
  },
});
