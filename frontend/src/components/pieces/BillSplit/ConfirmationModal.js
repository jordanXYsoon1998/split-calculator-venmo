import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import FriendItem from '../Friend/Item';
import { sendPaymentRequests } from '../../../actions';
import { getVenmoProfile, getVenmoFriendById } from '../../../reducers';

const GetVenmoObjWrapper = ({ friendId }) => {
  const [friendVenmoObj, isMyself] = useSelector(state => getVenmoFriendById(state, friendId));

  return (
    <FriendItem
      myself={isMyself}
      venmoObj={friendVenmoObj}
      displayOnly
    />
  );
};

/**
 * A Modal to confirm before submitting Venmo Requests
 * billSummary is an object with key-value pairs mapping
 *  the friendVenmoId to their total amount
 */
const BillSplitConfirmationModal = ({
  titleCaption,
  billSummary,
  onDismiss
}) => {
  const userProfile = useSelector(state => getVenmoProfile(state));
  const dispatch = useDispatch();

  // callback should take in friendId and amount
  const mapFriendAmount = (callback) => {
    return Object.entries(billSummary).map(([friendId, amount]) => {
      return callback(friendId, amount);
    });
  };

  const renderEachFriendTotal = (friendId, amount) => {
    return (
      <div className="item" key={friendId}>
        <div className="left floated content">
          <GetVenmoObjWrapper
            friendId={friendId}
          />
        </div>
        <div className="right floated">
          {`$${amount}`}
        </div>
      </div>
    );
  };

  const getTotalSummary = () => {
    return mapFriendAmount((friendId, amount) => amount).reduce(
      (accum, curr) => accum + curr, 0);
  };

  const renderContent = () => {
    return (
      <React.Fragment>
        <div className="ui large header">
          {titleCaption}
        </div>
        <div className="ui divided items">
          {mapFriendAmount(renderEachFriendTotal)}
          <div className="item">
            <div className="middle aligned content">
              <div className="header">Total</div>
            </div>
            <div className="right floated">
              {`$${getTotalSummary()}`}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const handleRequestButton = () => {
    const actualFriends = mapFriendAmount((friendId, amount) => {
      if (friendId === userProfile.id) {
        return null;
      } else {
        return { friendId, amount };
      }
    }).filter(thing => thing);

    if (actualFriends.length !== 0) {
      dispatch(sendPaymentRequests(titleCaption, actualFriends));
    }
  };

  const renderActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={onDismiss}
          className="ui button"
        >
          Go back
        </button>
        <button
          onClick={handleRequestButton}
          className="ui primary button"
        >
          Confirm
        </button>
      </React.Fragment>
    );
  };

  return (
    <Modal
      onDismiss={onDismiss}
      title="Are you sure you want to send these Venmo requests?"
      content={renderContent()}
      actions={renderActions()}
    />
  );
};

export default BillSplitConfirmationModal;
