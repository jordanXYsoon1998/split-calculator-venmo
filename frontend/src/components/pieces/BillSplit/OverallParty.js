import React from 'react';
import { useDispatch } from 'react-redux';

import BillSplitPartyItems from './PartyItems';
import { removeFriendFromBill } from '../../../actions';

const BillSplitOverallParty = () => {
  const dispatch = useDispatch();

  const onRemoveItem = (venmoObj) => {
    dispatch(removeFriendFromBill(venmoObj));
  };

  return (
    <div id="bill-party">
      <div className="ui large header">
        Bill Party
      </div>
      <BillSplitPartyItems
        onDelete={onRemoveItem}
      />
    </div>
  );
};

export default BillSplitOverallParty;
