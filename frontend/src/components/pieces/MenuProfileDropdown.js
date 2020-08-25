import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserAccount, userLogout, venmoLogout } from '../../actions';

const MenuProfileDropdown = ({ positionClass, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }

      // Close the dropdown if you click anywhere else on the page
      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick);

    // Cleanup and remove the event listener
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const renderedItems = () => {
    return (
      <React.Fragment>
        <div
          onClick={() => dispatch(venmoLogout())}
          className="item"
        >
          Sign out of Venmo
        </div>
        <div
          onClick={() => dispatch(deleteUserAccount())}
          className="item"
        >
          Delete SplitBill Account
        </div>
        <div
          onClick={() => dispatch(userLogout())}
          className="item"
        >
          Sign out
        </div>
      </React.Fragment>
    );
  };

  return (
    <div
      ref={ref}
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
