import { ADD_CATEGORY_STARTED } from '../../action-types.js';

export default (userId, name, value, iconId, limit = null) => ({
  type: ADD_CATEGORY_STARTED,
  payload: {
    userId,
    name,
    value,
    iconId,
    limit: limit === null ? null : limit,
  },
});
