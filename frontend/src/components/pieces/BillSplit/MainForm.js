import React, { useState } from 'react';
import useBillItems from '../../../hooks/billItems';
import Field from '../Field';
import BillSplitMainFormItem from './MainFormItem';

const BillSplitMainForm = () => {
  const [titleCaption, setTitleCaption] = useState('');
  const {
    billItems,
    addBillItem,
    handleBillItemChange,
    handlePartyAdd,
    handlePartyDelete
  } = useBillItems();

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
          onBillChange={handleBillItemChange}
          onPartyAdd={handlePartyAdd}
          onPartyDelete={handlePartyDelete}
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
