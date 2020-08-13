import {
  FETCH_FRIEND_LIST
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_FRIEND_LIST:
      return action.payload;
    default:
      return state;
  }
};
