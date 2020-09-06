import {
  ADD_FRIEND_BILL,
  REMOVE_FRIEND_BILL,
  FETCH_FRIEND_LIST,
  DELETE_FRIEND_LIST
} from '../../actions/types';

/**
 * Redux state to keep the unmodified friend list from Venmo backend
 */
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_FRIEND_LIST:
      return action.payload.map(friendObj => {
        return {
          billParty: false,
          friendObj
        };
      });
    case DELETE_FRIEND_LIST:
      return [];
    case ADD_FRIEND_BILL:
      return state.map(friend => friend.friendObj === action.payload ?
        { billParty: true, friendObj: friend.friendObj } : friend);
    case REMOVE_FRIEND_BILL:
      return state.map(friend => friend.friendObj === action.payload ?
        { billParty: false, friendObj: friend.friendObj } : friend);
    default:
      return state;
  }
};
