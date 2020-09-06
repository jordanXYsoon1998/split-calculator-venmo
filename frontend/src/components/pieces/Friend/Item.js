import React from 'react';
import { useDispatch } from 'react-redux';
import { addFriendToBill, removeFriendFromBill } from '../../../actions';

const FriendItem = ({ placeholder, billSelected, venmoObj }) => {
  const { profile_picture_url, display_name, username } = venmoObj || {};
  const dispatch = useDispatch();

  const onItemClick = () => {
    if (billSelected) {
      dispatch(removeFriendFromBill(venmoObj.id));
    } else {
      dispatch(addFriendToBill(venmoObj.id));
    }
  };

  const renderName = () => {
    if (!billSelected) {
      return display_name;
    }

    return (
      <div className="header">
        {display_name}
      </div>
    );
  };

  const renderSelected = () => {
    if (!billSelected) {
      return null;
    }

    return (
      <div className="ui right floated label">
        <i className="green check icon"></i>
      </div>
    );
  };

  if (placeholder) {
    return (
      <div className="item">
        <div className="ui placeholder">
          <div className="image header">
            <div className="line" />
            <div className="line" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onItemClick} className="item">
      <div className="middle aligned content">
        <div className="ui left floated mini circular image">
          <img
            src={profile_picture_url}
            alt={`Profile Pic (${display_name})`}
          />
        </div>
        {renderName()}
        <div className="meta">
          <span className="username">{`@${username}`}</span>
          {renderSelected()}
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
