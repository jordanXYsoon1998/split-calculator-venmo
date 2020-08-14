import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { fetchFriends, fetchPaymentMethods } from '../../actions';

class MainApp extends React.Component {
  componentDidMount() {
    this.props.fetchFriends();
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
        {this.renderRedirect()}
        <h2>Welcome to the Actual App page!</h2>
        <Link to="/" className="ui button">Return to Landing Page</Link>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { userAuth: state.userAuth, venmoAuth: state.venmoAuth };
};

export default connect(
  mapStateToProps,
  { fetchFriends, fetchPaymentMethods }
)(MainApp);
