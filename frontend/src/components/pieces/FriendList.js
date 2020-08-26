import React from 'react';
import { connect } from 'react-redux';

import { fetchFriends } from '../../actions';

class FriendList extends React.Component {
  componentDidMount() {
    this.props.fetchFriends();
  }

  render() {
    return (
      <div className="ui left fixed vertical menu">
        <div className="item">Friend1</div>
        <div className="item">Friend2</div>
        <div className="item">Friend3</div>
        <div className="item">Friend4</div>
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
