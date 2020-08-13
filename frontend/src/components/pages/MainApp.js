import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchFriends, fetchPaymentMethods } from '../../actions';

class MainApp extends React.Component {
  componentDidMount() {
    this.props.fetchFriends();
  }

  renderLogin() {
    if (this.props.userAuth === null || this.props.venmoAuth === null) {
      return (
        <h3>Fetching from server. Please wait...</h3>
      );
    } else if (this.props.userAuth && this.props.venmoAuth) {
      return (
        <h3>Welcome! You are authenticated in SplitBill and Venmo!</h3>
      );
    } else if (!this.props.userAuth) {
      return (
        <h3>We need to redirect you to the user login page!</h3>
      );
    } else if (!this.props.venmoAuth) {
      return (
        <h3>We need to redirect you to the Venmo login page!</h3>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderLogin()}
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
