import {
  FETCH_VENMO_PROFILE,
  DELETE_VENMO_PROFILE
} from '../../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_VENMO_PROFILE:
      return action.payload;
    case DELETE_VENMO_PROFILE:
      return {};
    default:
      return state;
  }
};
