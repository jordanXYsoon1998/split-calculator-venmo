import React, { useState } from 'react';
import BillSplitPartyItems from './PartyItems';
import BillSplitDetailedBreakdown from './DetailedBreakdown';

const BillSplitMainFormItem = ({
  item,
  index,
  onBillChange,
  onPartyAdd,
  onPartyDelete
}) => {
  const titleId = `item-title-${index}`;
  const amountId = `item-amount-${index}`;

  // Use this for handling drag and drop event
  const handlePartyAdd = (friendId) => {
    onPartyAdd(friendId, index);
  };

  const handlePartyDelete = (friendId) => {
    onPartyDelete(friendId, index);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    // Get friendId being added
    const droppedFriendId = event.dataTransfer.getData('friendId');
    handlePartyAdd(droppedFriendId);
  };

  return (
    <div
      className="ui stacked segment"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="fields">
        <div className="twelve wide field">
          <label>Item</label>
          <input
            type="text"
            name={titleId}
            data-idx={index}
            data-name="title"
            placeholder="Item" 
            value={item.title}
            onChange={onBillChange}
          />
        </div>
        <div className="four wide field">
          <label>Amount</label>
          <input
            type="text"
            name={amountId}
            data-idx={index}
            data-name="amount"
            placeholder="0"
            value={item.amount}
            onChange={onBillChange}
          />
        </div>
      </div>
      <BillSplitPartyItems
        friendIds={item.party.map(friend => friend.friendId)}
        onDelete={handlePartyDelete}
      />
      <BillSplitDetailedBreakdown
        {...{ item, index, onBillChange }}
      />
    </div>
  );
};

export default BillSplitMainFormItem;
