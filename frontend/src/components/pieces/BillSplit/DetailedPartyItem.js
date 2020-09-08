import React from 'react';
import { useSelector } from 'react-redux';
import { getVenmoFriendById } from '../../../reducers';

/**
 * This component is used for a single row/item in the detailed
 *  view of the friend with their amount of money.
 * Handles the presentation/layout of the information
 */
const BillSplitDetailedPartyItem = ({
  itemIndex,
  partyIndex,
  friendId,
  partyAmount,
  onBillChange
}) => {
  const friendObj = useSelector(state => getVenmoFriendById(state, friendId));

  const partyAmountId = `item-${itemIndex}-party-amount-${partyIndex}`;

  return (
    <div className="two fields">
      <div className="field">
        <label>Person</label>
        <input
          type="text"
          value={friendObj.display_name}
          readOnly
        />
      </div>
      <div className="field">
        <label>Amount</label>
        <input
          type="text"
          name={partyAmountId}
          data-name="party-amount"
          data-idx={itemIndex}
          data-partyidx={partyIndex}
          placeholder="0"
          value={partyAmount}
          onChange={onBillChange}
        />
      </div>
    </div>
  );
};

export default BillSplitDetailedPartyItem;
