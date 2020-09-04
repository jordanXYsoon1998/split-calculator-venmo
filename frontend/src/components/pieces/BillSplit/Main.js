import React from 'react';

import FriendList from '../Friend/List';
import BillSplitOverallParty from './OverallParty';
import BillSplitMainForm from './MainForm';
import './Main.css';

const BillSplitMain = () => {
  return (
    <div className="bill-split-wrapper">
      <div className="sidebar">
        <FriendList />
      </div>
      <div className="app-content">
        <div className="ui container">
          <h1>Welcome to BillSplitMain</h1>
          <BillSplitOverallParty />
          <BillSplitMainForm />
        </div>
      </div>
    </div>
  );
};

export default BillSplitMain;
