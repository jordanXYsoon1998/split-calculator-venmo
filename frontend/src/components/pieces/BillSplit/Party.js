import React from 'react';
import { connect } from 'react-redux';

import FriendPartyItem from '../Friend/PartyItem';

// TODO: Find out how to add yourself by default
class BillSplitParty extends React.Component {
  renderPartyItems() {
    return this.props.billParty.map(friend => {
      return (
        <FriendPartyItem
          key={friend.friendObj.id}
          venmoObj={friend.friendObj}
        />
      );
    });
  }

  render() {
    return (
      <div id="bill-party">
        <div className="ui large header">
          Bill Party
        </div>
        <div className="ui horizontal list">
          {this.renderPartyItems()}
        </div>
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
)(BillSplitParty);
