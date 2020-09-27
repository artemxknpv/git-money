import { CRUD_ICON_SUCCESS } from '../../action-types';

export default (id, newValue) => ({
  type: CRUD_ICON_SUCCESS,
  payload: {
    id,
    newValue,
  },
});
