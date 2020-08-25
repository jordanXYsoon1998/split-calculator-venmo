import {
  FETCH_FRIEND_LIST,
  DELETE_FRIEND_LIST
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_FRIEND_LIST:
      return action.payload;
    case DELETE_FRIEND_LIST:
      return [];
    default:
      return state;
  }
};
