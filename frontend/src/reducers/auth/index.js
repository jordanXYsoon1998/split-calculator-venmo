import { combineReducers } from 'redux';
import userAuthReducer from './userAuthReducer';
import venmoAuthReducer from './venmoAuthReducer';

export default combineReducers({
  user: userAuthReducer,
  venmo: venmoAuthReducer
});

export const getUserAuth = (state) => {
  return state.user;
};

export const getVenmoAuth = (state) => {
  return state.venmo;
};
