import { combineReducers } from 'redux';
import authReducer from './auth';
import friendListReducer from './friendListReducer';
import paymentMethodReducer from './paymentMethodReducer';

export default combineReducers({
  auth: authReducer,
  venmoFriends: friendListReducer,
  venmoPaymentMethods: paymentMethodReducer
});
