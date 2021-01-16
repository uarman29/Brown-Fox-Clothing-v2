import { combineReducers } from 'redux';
import shopDataReducer from './shopDataReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';

export default combineReducers({
    shopData: shopDataReducer,
    cart: cartReducer,
    user: userReducer
});