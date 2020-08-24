import React from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import { deleteUserAccount } from '../../actions';

class DeleteAccountModal extends React.Component {
  renderContent() {
    return (
      <React.Fragment>
        <p>Are you sure you want to delete your account?</p>
        <p>Don't worry, your Venmo access token will be revoked as well!</p>
      </React.Fragment>
    );
  }

  renderActions() {
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteUserAccount()}
          className="ui button negative"
        >
          Delete
        </button>
        <button
          onClick={() => this.props.onDismiss()}
          className="ui button"
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }

  render() {
    if (this.props.active) {
      return (
        <Modal
          onDismiss={() => this.props.onDismiss()}
          title="Delete Account"
          content={this.renderContent()}
          actions={this.renderActions()}
        />
      );
    }
    return null;
  }
}

export default connect(
  null,
  { deleteUserAccount }
)(DeleteAccountModal);
