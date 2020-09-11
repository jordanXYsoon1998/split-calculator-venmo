import React from 'react';

import FriendPartyItem from '../Friend/PartyItem';

/*
 * Props:
 * - friends :
 *    Array of Venmo Friend Ids who are part of the bill or part of
 * - onDelete :
 *    Callback to inherit appropriate behavior on delete from parent
 */
const BillSplitPartyItems = ({ friendIds, onDelete }) => {
  return (
    <div className="ui horizontal list">
      {friendIds.map(friendId => (
        <FriendPartyItem
          key={friendId}
          friendId={friendId}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BillSplitPartyItems;
