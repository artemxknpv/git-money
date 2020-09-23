import {MODAL_FORGOT_PASSWORD_CLOSED} from '../../action-types'

export default (email) => ({
  type: MODAL_FORGOT_PASSWORD_CLOSED,
  payload: {
    email,
  }
})
