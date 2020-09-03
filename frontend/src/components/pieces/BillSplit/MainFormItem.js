import React from 'react';

const BillSplitMainFormItem = ({ item, index, onChange }) => {
  const titleId = `item-title-${index}`;
  const amountId = `item-amount-${index}`;

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
            onChange={onChange}
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
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BillSplitMainFormItem;
