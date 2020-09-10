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

  const renderContent = () => {
    return (
      <React.Fragment>
        <div className="ui large header">
          {titleCaption}
        </div>
        <div className="ui items">
          {mapFriendAmount((friendId, amount) => (
            <React.Fragment key={friendId}>
              <GetVenmoObjWrapper
                friendId={friendId}
              />
              <span className="right floated">{amount}</span>
            </React.Fragment>
          ))}
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

    dispatch(sendPaymentRequests(titleCaption, actualFriends));
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
