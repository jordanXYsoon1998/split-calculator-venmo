import React from 'react';

const FriendItem = ({ venmoObj }) => {
  const { profile_picture_url, display_name, username } = venmoObj;

  return (
    <div className="item">
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
