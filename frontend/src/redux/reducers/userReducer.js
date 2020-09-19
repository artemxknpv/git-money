import * as actionTypes from '../action-types.js';
const initState = { isAuthenticated: false };
export default (store = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_USER_INFO_SUCCESS:
      const { user } = payload;
      return {
        ...store,
        firstName: user.firstName,
        lastName: user.lastName,
        mail: user.mail,
        login: user.log,
        totalMoney: user.totalMoney,
        isAuthenticated: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return initState;
    default:
      return store;
  }
};
