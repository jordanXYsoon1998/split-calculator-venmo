import React from 'react';

import FriendPartyItem from '../Friend/PartyItem';

// TODO: Find out how to add yourself by default
const BillSplitPartyItems = ({ friends, onDelete }) => {
  return (
    <div className="ui horizontal list">
      {friends.map(friend => (
        <FriendPartyItem
          key={friend.friendObj.id}
          venmoObj={friend.friendObj}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BillSplitPartyItems;
