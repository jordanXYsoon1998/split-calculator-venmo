import React from 'react';

import FriendList from '../Friend/List';
import './Main.css';

const BillSplitMain = () => {
  return (
    <div className="main-wrapper">
      <div className="sidebar">
        <FriendList />
      </div>
      <div className="app-content">
        <h1>Welcome to BillSplitMain</h1>
      </div>
    </div>
  );
};

export default BillSplitMain;
