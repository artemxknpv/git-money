import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer.js';
import modalWindowReducer from './modalWindowReducer.js';
import userReducer from './userReducer';
import transactionsReducer from './transactionsReducer';
import modalWindowCategoryReducer from './modalWindowCategoryReducer';
import modalWindowTransferMoneyReducer from './modalWindowTransferMoneyReducer';
import modalWindowTransactionHistoryReducer from './transactionHistoryModalReducer';
import modalWindowCrudCategory from './crudCategoryReducer';

export default combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  transactions: transactionsReducer,
  isModal: modalWindowReducer,
  isCategoryModal: modalWindowCategoryReducer,
  isTransferMoneyModal: modalWindowTransferMoneyReducer,
  isTransactionHistoryModal: modalWindowTransactionHistoryReducer,
  isCrudModalWindow: modalWindowCrudCategory,
});
