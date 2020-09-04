import React from 'react';
import { connect } from 'react-redux';

import BillSplitPartyItems from './PartyItems';
import { removeFriendFromBill } from '../../../actions';

class BillSplitOverallParty extends React.Component {
  onRemoveItem(venmoObj) {
    this.props.removeFriendFromBill(venmoObj);
  }

  render() {
    return (
      <div id="bill-party">
        <div className="ui large header">
          Bill Party
        </div>
        <BillSplitPartyItems
          friends={this.props.billParty}
          onDelete={(venmoObj) => this.onRemoveItem(venmoObj)}
        />
      </div>
    );
  }
};

const getBillParty = (friends) => {
  return friends.filter((friend) => friend.billParty);
};

const mapStateToProps = (state) => {
  return {
    billParty: getBillParty(state.venmoFriends)
  };
};

export default connect(
  mapStateToProps,
  { removeFriendFromBill }
)(BillSplitOverallParty);
