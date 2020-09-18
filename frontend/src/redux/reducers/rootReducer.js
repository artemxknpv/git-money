import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer.js';
import modalWindowReducer from './modalWindowReducer.js';
import userReducer from './userReducer';
import transactionsReducer from './transactionsReducer';
import modalWindowCategoryReducer from './modalWindowCategoryReducer';

export default combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  transactions: transactionsReducer,
  isModal: modalWindowReducer,
  isCategoryModal: modalWindowCategoryReducer,
});
