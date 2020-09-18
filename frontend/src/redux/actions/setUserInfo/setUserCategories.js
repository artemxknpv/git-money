import { SET_CATEGORIES } from '../../action-types';

export default categories => ({
  type: SET_CATEGORIES,
  payload: {
    categories,
  },
});
