import React from 'react';
import { connect } from 'react-redux';

import BillSplitPartyItems from './PartyItems';
import { removeFriendFromBill } from '../../../actions';
import { getBillParty } from '../../../reducers';

class BillSplitOverallParty extends React.Component {
  onRemoveItem(venmoObj) {
    this.props.removeFriendFromBill(venmoObj.id);
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

const mapStateToProps = (state) => {
  return {
    billParty: getBillParty(state)
  };
};

export default connect(
  mapStateToProps,
  { removeFriendFromBill }
)(BillSplitOverallParty);
