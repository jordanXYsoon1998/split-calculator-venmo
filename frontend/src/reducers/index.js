import { combineReducers } from 'redux';
import userAuthReducer from './userAuthReducer';
import venmoAuthReducer from './venmoAuthReducer';
import friendListReducer from './friendListReducer';
import paymentMethodReducer from './paymentMethodReducer';

export default combineReducers({
  userAuth: userAuthReducer,
  venmoAuth: venmoAuthReducer,
  venmoFriends: friendListReducer,
  venmoPaymentMethods: paymentMethodReducer
});
