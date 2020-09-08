import { combineReducers } from 'redux';
import authReducer, * as fromAuth from './auth';
import venmoReducer, * as fromVenmo from './venmo';

export default combineReducers({
  auth: authReducer,
  venmo: venmoReducer
});

export const getUserAuth = (state) => {
  return fromAuth.getUserAuth(state.auth);
};

export const getVenmoAuth = (state) => {
  return fromAuth.getVenmoAuth(state.auth);
};

export const getVenmoProfile = (state) => {
  return fromVenmo.getVenmoProfile(state.venmo);
};

export const getVenmoPaymentMethods = (state) => {
  return fromVenmo.getVenmoPaymentMethods(state.venmo);
};

export const getVenmoFriendById = (state, id) => {
  return fromVenmo.getVenmoFriendById(state.venmo, id);
};

export const getVenmoFriends = (state) => {
  return fromVenmo.getVenmoFriends(state.venmo);
};

export const getBillPartyIds = (state) => {
  return fromVenmo.getBillPartyIds(state.venmo);
};
