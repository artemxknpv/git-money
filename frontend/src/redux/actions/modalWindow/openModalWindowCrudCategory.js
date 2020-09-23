import { MODAL_CRUD_CATEGORY_OPENED } from '../../action-types.js';

export default (type, subtype, id, idStoreTo) => ({
  type: MODAL_CRUD_CATEGORY_OPENED,
  payload: {
    type,
    subtype,
    id,
    idStoreTo,
  },
});
