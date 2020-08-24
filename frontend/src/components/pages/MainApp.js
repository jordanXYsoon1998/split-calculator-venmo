import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { fetchFriends, fetchPaymentMethods } from '../../actions';
import DeleteAccountModal from '../pieces/DeleteAccountModal';

class MainApp extends React.Component {
  state = { deleteModalActive: false };

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
    if (this.props.venmoFriends.length !== 0) {
      return (
        <button onClick={() => { console.log(this.props.venmoFriends) }}>Print Friends</button>
      );
    }
    return null;
  }

  renderPaymentMethodsButton() {
    if (this.props.venmoPaymentMethods.length !== 0) {
      return (
        <button onClick={() => { console.log(this.props.venmoPaymentMethods) }}>Print Payment Methods</button>
      );
    }
    return null;
  }

  renderDeleteAccountButton() {
    return (
      <button
        onClick={() => this.setState({ deleteModalActive: true })}
        className="ui button negative"
      >
        Delete Account
      </button>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <h2>Welcome to the Actual App page!</h2>
        <Link to="/" className="ui button">Return to Landing Page</Link>
        {this.renderFriendsButton()}
        {this.renderPaymentMethodsButton()}
        {this.renderDeleteAccountButton()}
        {this.state.deleteModalActive ? 
          <DeleteAccountModal
            onDismiss={() => this.setState({ deleteModalActive: false })}
            active={this.state.deleteModalActive}
          /> : null
        }
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
