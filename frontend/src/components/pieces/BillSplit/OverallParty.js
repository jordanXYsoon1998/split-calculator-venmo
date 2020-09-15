import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BillSplitPartyItems from './PartyItems';
import { removeFriendFromBill } from '../../../actions';
import { getBillPartyIds } from '../../../reducers';

const BillSplitOverallParty = () => {
  const dispatch = useDispatch();
  const billPartyIds = useSelector(state => getBillPartyIds(state));

  const onRemoveItem = (friendId) => {
    dispatch(removeFriendFromBill(friendId));
  };

  return (
    <div id="bill-party">
      <div className="ui large header">
        Bill Party
      </div>
      <BillSplitPartyItems
        friendIds={billPartyIds}
        onDelete={onRemoveItem}
      />
    </div>
  );
};

export default BillSplitOverallParty;
