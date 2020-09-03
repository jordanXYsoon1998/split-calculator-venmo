import React, { useState, useEffect } from 'react';
import Field from '../Field';
import BillSplitMainFormItem from './MainFormItem';

const BillSplitMainForm = () => {
  const [titleCaption, setTitleCaption] = useState('');

  const blankBillItem = { title: '', amount: 0, party: [] };
  const [billItems, setBillItems] = useState([
    { ...blankBillItem }
  ]);

  const addBillItem = () => {
    setBillItems([...billItems, { ...blankBillItem }]);
  };

  const handleBillItemChange = (e) => {
    const updatedBillItems = [...billItems];
    updatedBillItems[e.target.dataset.idx][e.target.dataset.name] = e.target.value;
    setBillItems(updatedBillItems);
  };

  return (
    <form className="ui form">
      <div className="field">
        <Field
          className="massive transparent"
          name="title-caption"
          placeholder="Title/Caption"
          value={titleCaption}
          onChange={setTitleCaption}
        />
      </div>
      {billItems.map((billItem, index) => (
        <BillSplitMainFormItem
          key={index}
          item={billItem}
          index={index}
          onChange={handleBillItemChange}
        />
      ))}
      <button
        type="button"
        className="ui button"
        onClick={() => addBillItem()}
      >Add New Item</button>
    </form>
  );
};

export default BillSplitMainForm;
