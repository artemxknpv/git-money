import { CRUD_NAME_STARTED } from '../../action-types';

export default (userId, id, newValue) => ({
  type: CRUD_NAME_STARTED,
  payload: {
    userId,
    id,
    newValue,
  },
});
