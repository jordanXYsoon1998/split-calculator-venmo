import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { fetchFriends, fetchPaymentMethods } from '../../actions';
import MenuHeader from '../pieces/MenuHeader';
import BillSplitMain from '../pieces/BillSplit/Main';
import './MainApp.css';

class MainApp extends React.Component {
  componentDidMount() {
    this.props.fetchFriends();
    this.props.fetchPaymentMethods();
  }

  renderRedirect() {
    // TODO: Figure out logic because I'm sure it'll prematurely redirect
    if (this.props.userAuth === null && this.props.venmoAuth === null) {
      return (
        <h3>Fetching from server. Please wait...</h3>
      );
    } else if (this.props.userAuth && this.props.venmoAuth) {
      return (
        <h3>Welcome! You are authenticated in SplitBill and Venmo!</h3>
      );
    } else if (!this.props.userAuth) {
      return (
        <Redirect to="/login" />
      );
    } else if (this.props.venmoAuth === null) {
      return (
        <h3>Fetching from server. Please wait...</h3>
      );
    } else if (!this.props.venmoAuth) {
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
    userAuth: state.userAuth,
    venmoAuth: state.venmoAuth,
    venmoFriends: state.venmoFriends,
    venmoPaymentMethods: state.venmoPaymentMethods
  };
};

export default connect(
  mapStateToProps,
  { fetchFriends, fetchPaymentMethods }
)(MainApp);
