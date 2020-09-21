import * as actionTypes from '../action-types.js';
const initState = { isAuthenticated: false };
export default (store = initState, { type, payload, error }) => {
  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...store,
        _id: payload.id,
        isAuthenticated: true,
        errorText: '',
        error: false,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...store,
        errorText: payload,
        error,
      };
    case actionTypes.REGISTRATION_SUCCESS:
      return {
        ...store,
        errorText: '',
        error: false,
      };
    case actionTypes.REGISTRATION_FAILURE:
      return {
        ...store,
        errorText: payload,
        error,
      };
    case actionTypes.ERROR_RESET:
      return {
        ...store,
        errorText: '',
        error: false,
      };
    case actionTypes.SET_USER_INFO_SUCCESS:
      const { user } = payload;
      return {
        ...store,
        firstName: user.firstName,
        lastName: user.lastName,
        mail: user.mail,
        login: user.log,
        totalMoney: user.totalMoney,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return initState;
    default:
      return store;
  }
};
