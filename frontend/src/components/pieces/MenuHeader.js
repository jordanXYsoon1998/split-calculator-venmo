import React from 'react';
import MenuProfileDropdown from './MenuProfileDropdown';

const MenuHeader = () => {
  return (
    <div className="ui borderless top fixed menu">
      <div className="ui text container">
        <div className="ui left floated header item">VenSplitMo</div>
        <MenuProfileDropdown
          positionClass="right floated"
          label="Profile"
        />
      </div>
    </div>
  );
};

export default MenuHeader;
