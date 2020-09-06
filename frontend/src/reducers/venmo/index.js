import { combineReducers } from 'redux';
import friendListReducer from './friendList';
import paymentMethodsReducer from './paymentMethods';

export default combineReducers({
  friends: friendListReducer,
  paymentMethods: paymentMethodsReducer
});
