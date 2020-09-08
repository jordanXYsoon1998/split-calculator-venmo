import React, { useState } from 'react';
import BillSplitDetailedPartyItem from './DetailedPartyItem';

const BillSplitDetailedBreakdown = ({
  item,
  index,
  onBillChange
}) => {
  const [detailedView, setDetailedView] = useState(false);

  const detailedClass = () => {
    return detailedView ? ' active' : '';
  };

  return (
    <div className="ui styled fluid accordion field">
      <div
        className={`title${detailedClass()}`}
        onClick={() => setDetailedView(!detailedView)}
      >
        <i className="icon dropdown"></i>
        Detailed Breakdown
      </div>
      <div
        className={`content fields${detailedClass()}`}
      >
        {item.party.map(({ friendId, amount }, partyIndex) => (
          <BillSplitDetailedPartyItem
            key={friendId}
            itemIndex={index}
            partyIndex={partyIndex}
            friendId={friendId}
            partyAmount={amount}
            onBillChange={onBillChange}
          />
        ))}
      </div>
    </div>
  );
};

export default BillSplitDetailedBreakdown;
