import React from 'react';
import BillSplitPartyItems from './PartyItems';

const BillSplitMainFormItem = ({
  item,
  index,
  onBillChange,
  onPartyAdd,
  onPartyDelete
}) => {
  const titleId = `item-title-${index}`;
  const amountId = `item-amount-${index}`;

  // TODO: Use this for handling drag and drop event
  const handlePartyAdd = (friendId) => {
    onPartyAdd(friendId, index);
  };

  const handlePartyDelete = (friendId) => {
    onPartyDelete(friendId, index);
  };

  return (
    <div className="ui stacked segment">
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
        friends={item.party}
        onDelete={handlePartyDelete}
      />
    </div>
  );
};

export default BillSplitMainFormItem;
