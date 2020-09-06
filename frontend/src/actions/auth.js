import {
  USER_LOGGED_IN,
  USER_NOT_LOGGED_IN,
  VENMO_LOGGED_IN,
  VENMO_NOT_LOGGED_IN,
  VENMO_UNKNOWN_LOGGED_IN
} from './types';

export const userLoginState = () => {
  return {
    type: USER_LOGGED_IN
  };
};

export const userLogoutState = () => {
  return {
    type: USER_NOT_LOGGED_IN
  };
};

export const venmoLoginState = () => {
  return {
    type: VENMO_LOGGED_IN
  };
};

export const venmoLogoutState = () => {
  return {
    type: VENMO_NOT_LOGGED_IN
  };
};

export const venmoUnknownState = () => {
  return {
    type: VENMO_UNKNOWN_LOGGED_IN
  };
};
