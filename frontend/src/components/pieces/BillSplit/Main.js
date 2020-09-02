import React from 'react';

import FriendList from '../Friend/List';
import BillSplitParty from './Party';
import './Main.css';

const BillSplitMain = () => {
  return (
    <div className="bill-split-wrapper">
      <div className="sidebar">
        <FriendList />
      </div>
      <div className="app-content">
        <h1>Welcome to BillSplitMain</h1>
        <BillSplitParty />
      </div>
    </div>
  );
};

export default BillSplitMain;
