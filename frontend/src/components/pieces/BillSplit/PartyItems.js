import React from 'react';
import { connect } from 'react-redux';

import FriendPartyItem from '../Friend/PartyItem';

// TODO: Find out how to add yourself by default
class BillSplitPartyItems extends React.Component {
  render() {
    return (
      <div className="ui horizontal list">
        {this.props.billParty.map(friend => (
          <FriendPartyItem
            key={friend.friendObj.id}
            venmoObj={friend.friendObj}
            onDelete={(venmoObj) => this.props.onDelete(venmoObj)}
          />
        ))}
      </div>
    );
  }
}

const getBillParty = (friends) => {
  return friends.filter((friend) => friend.billParty);
};

const mapStateToProps = (state) => {
  return {
    billParty: getBillParty(state.venmoFriends)
  };
};

export default connect(
  mapStateToProps
)(BillSplitPartyItems);
