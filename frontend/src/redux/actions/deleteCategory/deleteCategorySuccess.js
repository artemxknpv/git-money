import { DELETE_CATEGORY_SUCCESS } from '../../action-types';

export default id => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: {
    id,
  },
});
