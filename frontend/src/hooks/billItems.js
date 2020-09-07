import React, { useState } from 'react';

// A Custom hook to handle all reads/updates to the bill form state
export default () => {
  /*
   * party structure (Bcos we should match the structure of Redux store):
   *    friendId: Number/String
   *    amount: Number
   */
  const blankBillItem = { title: '', amount: 0, party: [] };

  const [billItems, setBillItems] = useState([
    { ...blankBillItem }
  ]);

  const addBillItem = () => {
    setBillItems([...billItems, { ...blankBillItem }]);
  };

  /*
   * Takes in an onChange event
   */
  const handleBillItemChange = (e) => {
    const updatedBillItems = [...billItems];
    switch (e.target.dataset.name) {
      case 'title':
      case 'amount':
        updatedBillItems[e.target.dataset.idx][e.target.dataset.name] = e.target.value;
        break;
      // TODO: Figure this out once you settle the detailed version of MainFormItem
      case 'party':
        break;
      default:
        break;
    }
    setBillItems(updatedBillItems);
  };

  const handlePartyAdd = (friendId, index) => {
    // Don't want to add duplicates to the party
    if (!billItems[index].party.find(friend => friend.friendId === friendId)) {
      const updatedBillItems = [...billItems];
      const partyList = updatedBillItems[index].party;
      updatedBillItems[index].party = [...partyList, { friendId, amount: 0 }];
      setBillItems(updatedBillItems);
    }
  };

  const handlePartyDelete = (friendId, index) => {
    const updatedBillItems = [...billItems];
    const partyList = updatedBillItems[index].party;
    updatedBillItems[index]['party'] = partyList.filter(member => member.friendId !== friendId);
    setBillItems(updatedBillItems);
  };

  return { billItems, addBillItem, handleBillItemChange, handlePartyAdd, handlePartyDelete };
};
