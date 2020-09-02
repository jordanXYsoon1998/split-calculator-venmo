import React from 'react';
import { useDispatch } from 'react-redux';

import { removeFriendFromBill } from '../../../actions';
import './PartyItem.css';

const FriendPartyItem = ({ venmoObj }) => {
  const { profile_picture_url, display_name, username } = venmoObj || {};
  const dispatch = useDispatch();

  const onItemClick = () => {
    dispatch(removeFriendFromBill(venmoObj));
  };

  return (
    <div className="item">
      <div
        data-tooltip={display_name}
      >
        <a
          className="ui right corner tiny label"
          onClick={onItemClick}
        >
          <i className="delete icon"></i>
        </a>
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
