import { DELETE_CATEGORY_STARTED } from '../../action-types';

export default id => ({
  type: DELETE_CATEGORY_STARTED,
  payload: {
    id,
  },
});
