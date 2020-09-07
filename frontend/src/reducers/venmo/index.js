import { combineReducers } from 'redux';
import friendListReducer, * as fromFriendList from './friendList';
import paymentMethodsReducer from './paymentMethods';

export default combineReducers({
  friends: friendListReducer,
  paymentMethods: paymentMethodsReducer
});

export const getVenmoPaymentMethods = (state) => {
  return state.paymentMethods;
};

export const getVenmoFriends = (state) => {
  return fromFriendList.getVenmoFriends(state.friends);
};

export const getVenmoFriendById = (state, id) => {
  return fromFriendList.getVenmoFriendById(state.friends, id);
};

export const getBillPartyIds = (state) => {
  return fromFriendList.getBillPartyIds(state.friends);
};
