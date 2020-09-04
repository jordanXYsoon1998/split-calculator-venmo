import React, { useState } from 'react';
import Field from '../Field';
import BillSplitMainFormItem from './MainFormItem';

const BillSplitMainForm = () => {
  const [titleCaption, setTitleCaption] = useState('');

  /*
   * party structure (Bcos we should match the structure of Redux store):
   *    billParty: Boolean
   *    friend: venmoObj
   *    amount: Number
   */
  const blankBillItem = { title: '', amount: 0, party: [] };

  const [billItems, setBillItems] = useState([
    { ...blankBillItem }
  ]);

  const addBillItem = () => {
    setBillItems([...billItems, { ...blankBillItem }]);
  };

  const handleBillItemChange = (e) => {
    const updatedBillItems = [...billItems];
    switch (e.target.dataset.name) {
      case 'title':
      case 'amount': updatedBillItems[e.target.dataset.idx][e.target.dataset.name] = e.target.value;
        break;
      // TODO: Figure this out once you settle the detailed version of MainFormItem
      case 'party':
        break;
      default:
        break;
    }
    setBillItems(updatedBillItems);
  };

  const handlePartyAdd = (venmoObj, index) => {
    const updatedBillItems = [...billItems];
    const partyList = updatedBillItems[index].party;
    updatedBillItems[index].party = [...partyList, { friend: venmoObj, amount: 0 }];
    setBillItems(updatedBillItems);
  };

  const handlePartyDelete = (venmoObj, index) => {
    const updatedBillItems = [...billItems];
    const partyList = updatedBillItems[index].party;
    updatedBillItems[index]['party'] = partyList.filter(member => member.friendObj !== venmoObj);
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
          onBillChange={handleBillItemChange}
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
