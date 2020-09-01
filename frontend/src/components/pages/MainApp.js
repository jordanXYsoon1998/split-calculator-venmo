import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { fetchFriends, fetchPaymentMethods } from '../../actions';
import MenuHeader from '../pieces/MenuHeader';
import FriendList from '../pieces/Friend/List';
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

  renderFriendsButton() {
    return (
      <Link to="/venmo-friends" className="ui button">
        Go to Friend List
      </Link>
    );
    /*
    if (this.props.venmoFriends.length !== 0) {
      return (
        <button onClick={() => { console.log(this.props.venmoFriends) }}>Print Friends</button>
      );
    }
    return null;
    */
  }

  renderPaymentMethodsButton() {
    if (this.props.venmoPaymentMethods.length !== 0) {
      return (
        <button onClick={() => { console.log(this.props.venmoPaymentMethods) }}>Print Payment Methods</button>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="main-wrapper">
        <div className="sidebar">
          <FriendList />
        </div>
        <div className="main">
          <MenuHeader />
          {this.renderRedirect()}
          <h2>Welcome to the Actual App page!</h2>
          <Link to="/" className="ui button">Return to Landing Page</Link>
          {this.renderFriendsButton()}
          {this.renderPaymentMethodsButton()}
        </div>
      </div>
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
