import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { removeFriendFromBill } from '../../../actions';
import './PartyItem.css';

const FriendPartyItem = ({ venmoObj }) => {
  const { profile_picture_url, display_name, username } = venmoObj || {};
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();

  const onItemClick = () => {
    dispatch(removeFriendFromBill(venmoObj));
  };

  return (
    <div className="item">
      <div
        data-tooltip={display_name}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <a
            className="floating ui tiny label"
            onClick={onItemClick}
          >
            <i className="delete icon"></i>
          </a>
        ) : null}
        <img
          className="ui circular image profile-pic"
          src={profile_picture_url}
          alt={`Profile Pic (${display_name})`}
        />
      </div>
    </div>
  );
};

export default FriendPartyItem;
