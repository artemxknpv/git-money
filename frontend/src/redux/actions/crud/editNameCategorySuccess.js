import { CRUD_NAME_SUCCESS } from '../../action-types';

export default (id, newValue) => ({
  type: CRUD_NAME_SUCCESS,
  payload: {
    id,
    newValue,
  },
});
