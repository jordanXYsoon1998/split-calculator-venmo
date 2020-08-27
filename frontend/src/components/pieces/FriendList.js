import React from 'react';
import { connect } from 'react-redux';

import { fetchFriends } from '../../actions';
import FriendItem from './FriendItem';
import './FriendList.css';

class FriendList extends React.Component {
  componentDidMount() {
    this.props.fetchFriends();
  }

  renderFriends() {
    if (this.props.venmoFriends.length === 0) {
      return null;
    }

    return this.props.venmoFriends.map((friend) => {
      return <FriendItem venmoObj={friend.friendObj} />;
    });
  }

  render() {
    return (
      <div
        id="friend-list"
        className="ui left fixed large borderless vertical menu"
      >
        <div className="ui link items">
          {this.renderFriends()}
        </div>
      </div>
    );
  }
}

const getSelectableFriends = (friends) => {
  return friends.filter(friend => !friend.bill);
};

const mapStateToProps = (state) => {
  return {
    venmoFriends: getSelectableFriends(state.venmoFriends)
  };
};

export default connect(
  mapStateToProps,
  { fetchFriends }
)(FriendList);
