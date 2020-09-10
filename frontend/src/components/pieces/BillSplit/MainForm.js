import React, { useState } from 'react';
import useBillItems from '../../../hooks/billItems';
import Field from '../Field';
import BillSplitMainFormItem from './MainFormItem';
import BillSplitConfirmationModal from './ConfirmationModal';

const BillSplitMainForm = () => {
  const [titleCaption, setTitleCaption] = useState('');
  const [confirmActive, setConfirmActive] = useState(false);
  const {
    billItems,
    addBillItem,
    deleteBillItem,
    handleBillItemChange,
    handlePartyAdd,
    handlePartyDelete,
    getBillSummary
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
          onBillDelete={deleteBillItem}
          onPartyAdd={handlePartyAdd}
          onPartyDelete={handlePartyDelete}
        />
      ))}
      <div>
        <button
          type="button"
          className="ui left floated button"
          onClick={() => addBillItem()}
        >Add New Item</button>
        <button
          type="button"
          onClick={() => setConfirmActive(true)}
          className="ui right floated primary button"
        >Request</button>
      </div>
      {confirmActive ? (
        <BillSplitConfirmationModal
          titleCaption={titleCaption}
          billSummary={getBillSummary()}
          onDismiss={() => setConfirmActive(false)}
        />
      ) : null }
    </form>
  );
};

export default BillSplitMainForm;
