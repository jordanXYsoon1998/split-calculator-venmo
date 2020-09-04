import React from 'react';

import FriendPartyItem from '../Friend/PartyItem';

// TODO: Find out how to add yourself by default
/*
 * Props:
 * - friends :
 *    Array of friends who are part of the bill or part of
 * - onDelete :
 *    Callback to inherit appropriate behavior on delete from parent
 */
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
};

export default BillSplitPartyItems;
