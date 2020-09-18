import { MODAL_ADD_CATEGORY_OPENED } from '../../action-types.js';

export default type => ({
  type: MODAL_ADD_CATEGORY_OPENED,
  payload: {
    type,
  },
});
