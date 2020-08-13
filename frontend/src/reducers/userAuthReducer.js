import {
  USER_LOGGED_IN,
  USER_NOT_LOGGED_IN
} from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return true;
    case USER_NOT_LOGGED_IN:
      return false;
    default:
      return state;
  }
};
