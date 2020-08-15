import {
  VENMO_LOGGED_IN,
  VENMO_NOT_LOGGED_IN
} from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case VENMO_LOGGED_IN:
      return true;
    case VENMO_NOT_LOGGED_IN:
      return false;
    default:
      return state;
  }
};