import { createSelector } from 'reselect';
import {
  ADD_FRIEND_BILL,
  REMOVE_FRIEND_BILL,
  FETCH_FRIEND_LIST,
  DELETE_FRIEND_LIST
} from '../../actions/types';

const fetchFriendList = (friendList) => {
  const newState = {};
  friendList.forEach(friend => {
    newState[friend.id] = {
      billParty: false,
      friendObj: friend
    };
  });
  return newState;
};

const friendBillHelper = (state, friendId, billParty) => {
  const originalObj = state[friendId];
  return {...state, [friendId]: { ...originalObj, billParty } };
};

/**
 * Redux state to keep the unmodified friend list from Venmo backend
 */
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FRIEND_LIST:
      return fetchFriendList(action.payload);
    case DELETE_FRIEND_LIST:
      return {};
    case ADD_FRIEND_BILL:
      return friendBillHelper(state, action.payload, true);
    case REMOVE_FRIEND_BILL:
      return friendBillHelper(state, action.payload, false);
    default:
      return state;
  }
};

const friendsSelector = state => state;

const compareFriends = (a, b) => {
  if (a.friendObj.display_name < b.friendObj.display_name) {
    return -1;
  } else if (a.friendObj.display_name > b.friendObj.display_name) {
    return 1;
  } else {
    return 0;
  }
};

export const getVenmoFriendById = (state, id) => state[id];

// Selector that returns a sorted list of all the Venmo friends
export const getVenmoFriends = createSelector([friendsSelector], friends => {
  return Object.values(friends).sort(compareFriends);
});

export const getBillParty = createSelector([getVenmoFriends], friends => {
  return friends.filter(friend => friend.billParty);
});