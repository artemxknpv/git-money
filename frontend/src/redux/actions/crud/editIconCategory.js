import { CRUD_ICON_STARTED } from '../../action-types';

export default (userId, id, newValue) => ({
  type: CRUD_ICON_STARTED,
  payload: {
    userId,
    id,
    newValue,
  },
});
