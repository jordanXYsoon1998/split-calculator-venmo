import React from 'react';
import { useDispatch } from 'react-redux';
import { addFriendToBill } from '../../actions';

const FriendItem = ({ venmoObj }) => {
  const { profile_picture_url, display_name, username } = venmoObj;
  const dispatch = useDispatch();

  const onItemClick = () => {
    dispatch(addFriendToBill(venmoObj));
  };

  return (
    <div onClick={onItemClick} className="item">
      <div className="content">
        <div className="ui left floated mini circular image">
          <img
            src={profile_picture_url}
            alt={`Profile Pic (${display_name})`}
          />
        </div>
        <div className="header">{display_name}</div>
        <div className="meta">
          <span className="username">{`@${username}`}</span>
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
