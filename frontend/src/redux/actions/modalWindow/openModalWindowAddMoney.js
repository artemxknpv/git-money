import { MODAL_OPENED } from '../../action-types.js';

export default id => ({
  type: MODAL_OPENED,
  payload: {
    id,
  },
});
