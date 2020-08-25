import React, { useState } from 'react';

const MenuProfileDropdown = ({ positionClass, label }) => {
  const [open, setOpen] = useState(false);

  const renderedItems = () => {
    return (
      <React.Fragment>
        <div className="item">Sign out of Venmo</div>
        <div className="item">Delete SplitBill Account</div>
        <div className="item">Sign out</div>
      </React.Fragment>
    );
  };

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`ui ${positionClass} dropdown item${open ? ' active visible' : ''}`}
    >
      <div className="text">{label}</div>
      <i className="dropdown icon"></i>
      <div className={`menu${open ? ' visible transition' : ''}`}>
        {renderedItems()}
      </div>
    </div>
  );
};

export default MenuProfileDropdown;
