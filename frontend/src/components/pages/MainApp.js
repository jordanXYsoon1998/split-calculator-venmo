import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchFriends, fetchPaymentMethods, fetchVenmoProfile } from '../../actions';
import MenuHeader from '../pieces/MenuHeader';
import BillSplitMain from '../pieces/BillSplit/Main';
import './MainApp.css';

class MainApp extends React.Component {
  componentDidMount() {
    this.props.fetchVenmoProfile();
    this.props.fetchFriends();
    this.props.fetchPaymentMethods();
  }

  renderRedirect() {
    // TODO: Figure out logic because I'm sure it'll prematurely redirect
    if (this.props.auth.user === null && this.props.auth.venmo === null) {
      return (
        <h3>Fetching from server. Please wait...</h3>
      );
    } else if (this.props.auth.user && this.props.auth.venmo) {
      return (
        <h3>Welcome! You are authenticated in SplitBill and Venmo!</h3>
      );
    } else if (!this.props.auth.user) {
      return (
        <Redirect to="/login" />
      );
    } else if (this.props.auth.venmo === null) {
      return (
        <h3>Fetching from server. Please wait...</h3>
      );
    } else if (!this.props.auth.venmo) {
      return (
        <Redirect to="/venmo-login" />
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-header">
          <MenuHeader />
        </div>
        <div className="main-content">
          <BillSplitMain />
          {this.renderRedirect()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { fetchFriends, fetchPaymentMethods, fetchVenmoProfile }
)(MainApp);
