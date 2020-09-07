import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getVenmoFriendById } from '../../../reducers';
import './PartyItem.css';

/* `onDelete` because if it's overall bill party then we remove
 * them from the bill.
 *  However, if it's just item party, then remove from that item
 */
const FriendPartyItem = ({ friendId, onDelete }) => {
  const venmoObj = useSelector(state => getVenmoFriendById(state, friendId));

  const { profile_picture_url, display_name, username } = venmoObj || {};
  const [hover, setHover] = useState(false);

  const onItemClick = () => {
    onDelete(friendId);
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
