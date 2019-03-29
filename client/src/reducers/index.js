import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import errorReducer from './errorReducer.js';
import itemsReducer from './itemsReducer.js';
import cartReducer from './cartReducer.js';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  items: itemsReducer,
  cart: cartReducer
});
