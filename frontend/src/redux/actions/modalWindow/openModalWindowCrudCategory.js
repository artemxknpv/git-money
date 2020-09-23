import { MODAL_CRUD_CATEGORY_OPENED } from '../../action-types.js';

export default (type, subtype, id) => ({
  type: MODAL_CRUD_CATEGORY_OPENED,
  payload: {
    type,
    subtype,
    id,
  },
});
