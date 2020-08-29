import React from 'react';
import { connect } from 'react-redux';

import { fetchFriends } from '../../actions';
import FriendItem from './FriendItem';
import './FriendList.css';

const __PLACEHOLDER_NUM = 20;

class FriendList extends React.Component {
  state = { searchTerm: '' };

  componentDidMount() {
    this.props.fetchFriends();
  }

  renderSearch() {
    const loading = this.props.venmoFriends.length === 0;
    const inputClassName = `ui ${loading ? 'disabled ' : ''}icon input`;
    return (
      <div className={inputClassName}>
        <input
          type="text"
          placeholder="Search friends..."
          value={this.state.searchTerm}
          onChange={(e) => this.setState({ searchTerm: e.target.value })}
        />
        <i className="search icon"></i>
      </div>
    );
  }

  renderFriends() {
    if (this.props.venmoFriends.length === 0) {
      return [...Array(__PLACEHOLDER_NUM)].map(() => {
        return <FriendItem placeholder />;
      });
    }

    const lowerSearchTerm = this.state.searchTerm.toLowerCase();

    return this.props.venmoFriends.map((friend) => {
      // Only render filtered characters
      const { username, display_name } = friend.friendObj;
      if (username.toLowerCase().includes(lowerSearchTerm) ||
            display_name.toLowerCase().includes(lowerSearchTerm)) {
        return (
          <FriendItem
            billSelected={friend.bill}
            venmoObj={friend.friendObj}
            key={friend.friendObj.id}
          />
        );
      }
      return null;
    });
  }

  render() {
    return (
      <div
        id="friend-list"
        className="ui left fixed large borderless vertical menu"
      >
        {this.renderSearch()}
        <div className="ui link items">
          {this.renderFriends()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    venmoFriends: state.venmoFriends
  };
};

export default connect(
  mapStateToProps,
  { fetchFriends }
)(FriendList);
