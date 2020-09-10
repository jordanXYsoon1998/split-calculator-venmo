import { useState, useEffect } from 'react';

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

  useEffect(() => {
    console.log(billItems);
  }, [billItems]);

  const addBillItem = () => {
    setBillItems([...billItems, { ...blankBillItem }]);
  };

  const deleteBillItem = (index) => {
    const newBillItems = [...billItems];
    newBillItems.splice(index, 1);
    setBillItems(newBillItems);
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
      case 'party-amount':
        updatedBillItems[e.target.dataset.idx]['party'][e.target.dataset.partyidx]['amount'] = e.target.value;
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

  const getBillSummary = () => {
    const friendTotalAmountPairs = billItems.reduce((accum, currBill) => {
      const newAccum = {...accum};
      currBill.party.forEach((friend) => {
        if (newAccum[friend.friendId] === undefined) {
          newAccum[friend.friendId] = 0;
        }
        newAccum[friend.friendId] += Number(friend.amount);
      });
      return newAccum;
    }, {});

    return friendTotalAmountPairs;
  };

  return {
    billItems, addBillItem, deleteBillItem, handleBillItemChange,
    handlePartyAdd, handlePartyDelete,
    getBillSummary
  };
};
