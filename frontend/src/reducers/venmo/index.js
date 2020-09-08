import { combineReducers } from 'redux';
import profileReducer from './profile';
import friendListReducer, * as fromFriendList from './friendList';
import paymentMethodsReducer from './paymentMethods';

export default combineReducers({
  profile: profileReducer,
  friends: friendListReducer,
  paymentMethods: paymentMethodsReducer
});

export const getVenmoProfile = (state) => {
  return state.profile;
};

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
