import * as actionTypes from '../action-types.js';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return action.payload.categories;
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return state.filter(category => category.id !== action.payload.id);
    case actionTypes.ADD_CATEGORY_SUCCESS:
      return [...state, action.payload.category];
    case actionTypes.ADD_MONEY_STORE_SUCCESS:
      return state.map(category =>
        category.id === action.payload.id
          ? {
              ...category,
              currentNumber: category.currentNumber + action.payload.amount,
            }
          : category
      );
    case actionTypes.TRANSFER_MONEY_STORE_SUCCESS:
      return state.map(category =>
        category.id === action.payload.idFrom
          ? {
              ...category,
              currentNumber: category.currentNumber - action.payload.amount,
            }
          : category.id === action.payload.idTo
          ? {
              ...category,
              currentNumber: category.currentNumber + action.payload.amount,
            }
          : category
      );
    case actionTypes.TRANSFER_B_STORES_SUCCESS:
      return state.map(category =>
        category.id === action.payload.idFrom
          ? {
              ...category,
              currentNumber: category.currentNumber - action.payload.amount,
            }
          : category.id === action.payload.idTo
          ? {
              ...category,
              currentNumber: category.currentNumber + action.payload.amount,
            }
          : category
      );

    case actionTypes.LOGOUT_SUCCESS:
      return [];
    case actionTypes.CRUD_ICON_SUCCESS:
      return state.map(category => {
        return category.id === action.payload.id
          ? { ...category, iconId: action.payload.newValue }
          : category;
      });
    case actionTypes.CRUD_NAME_SUCCESS:
      return state.map(category => {
        return category.id === action.payload.id
          ? { ...category, name: action.payload.newValue }
          : category;
      });
    default:
      return state;
    // TODO
    // case actionTypes.ADD_CATEGORY_FAILURE:
    // case actionTypes.DELETE_CATEGORY_FAILURE:
    // // TODO
    // case actionTypes.RENAME_CATEGORY_SUCCESS:
    // // TODO
    // case actionTypes.RENAME_CATEGORY_FAILURE:
    // // TODO
  }
};
