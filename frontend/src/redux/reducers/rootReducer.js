import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer.js';

export default () => {
  combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer,
  });
};
