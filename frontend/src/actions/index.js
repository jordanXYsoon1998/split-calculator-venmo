import splitbill from '../apis/splitbill';
import history from '../history';
import {
  ADD_MYSELF,
  ADD_FRIEND_BILL,
  REMOVE_FRIEND_BILL,
  FETCH_VENMO_PROFILE,
  DELETE_VENMO_PROFILE,
  FETCH_FRIEND_LIST,
  DELETE_FRIEND_LIST,
  FETCH_PAYMENT_METHODS,
  DELETE_PAYMENT_METHODS,
} from './types';
import {
  userLoginState,
  userLogoutState,
  venmoLoginState,
  venmoLogoutState,
  venmoUnknownState
} from './auth';
export {
  userLoginState,
  userLogoutState,
  venmoLoginState,
  venmoLogoutState,
  venmoUnknownState
};

const venmoClearProfile = () => {
  return {
    type: DELETE_VENMO_PROFILE
  };
};

const venmoClearFriends = () => {
  return {
    type: DELETE_FRIEND_LIST
  };
};

// We don't need to worry about this yet
const venmoClearPaymentMethods = () => {
  return {
    type: DELETE_PAYMENT_METHODS
  };
};

export const deleteUserAccount = () => async dispatch => {
  await splitbill.delete('/users/me');
  // If successful, we know the person is logged out
  dispatch(userLogoutState());
  dispatch(venmoUnknownState());
  dispatch(venmoClearFriends());
  dispatch(venmoClearPaymentMethods());
};

export const userLogout = () => async dispatch => {
  await splitbill.post('/users/logout');
  // If successful, we know the person is logged out
  dispatch(userLogoutState());
  dispatch(venmoUnknownState());
  dispatch(venmoClearFriends());
  dispatch(venmoClearPaymentMethods());
};

export const venmoLogout = () => async dispatch => {
  await splitbill.post('/venmoUsers/logout');
  // If successful, we know the person is logged out from Venmo
  dispatch(venmoLogoutState());
  dispatch(venmoClearFriends());
  dispatch(venmoClearPaymentMethods());
};

const _responseHelper = (dispatch, response, successCb) => {
  if (response.status === 200) {
    // Successfully fetched the list of friends
    // That means we're authenticated for both user and venmo
    dispatch(userLoginState());
    dispatch(venmoLoginState());

    // Call the successful callback
    successCb(dispatch, response);
  } else if (response.status === 401) {
    // Unauthorized
    // If response payload code is 401, user authorization needed
    // If response payload code is 402, Venmo authorization needed
    if (response.data.error.code === 401) {
      dispatch(userLogoutState());
    } else if (response.data.error.code === 402) {
      // User authenticated but not Venmo authenticated
      dispatch(userLoginState());
      dispatch(venmoLogoutState());
    }
  }
};

export const fetchVenmoProfile = () => async dispatch => {
  const profilePath = 'venmoUsers/me';
  const response = await splitbill.get(profilePath, {
    validateStatus: function(status) {
      // If not authenticated, we'll get 401 code
      return status < 500;
    }
  });

  _responseHelper(dispatch, response, (dispatch, response) => {
    dispatch({
      type: FETCH_VENMO_PROFILE,
      payload: response.data.data
    });
    dispatch({
      type: ADD_MYSELF,
      payload: response.data.data
    });
  });
};

export const fetchFriends = () => async dispatch => {
  const friendsPath = 'venmoUsers/me/friends';
  const response = await splitbill.get(friendsPath, {
    validateStatus: function(status) {
      // If not authenticated, we'll get 401 code
      return status < 500;
    }
  });
  
  _responseHelper(dispatch, response, (dispatch, response) => {
    dispatch({
      type: FETCH_FRIEND_LIST,
      payload: response.data.data
    });
  });
};

export const fetchPaymentMethods = () => async dispatch => {
  const paymentMethodsPath = 'venmoUsers/me/payment-methods';
  const response = await splitbill.get(paymentMethodsPath, {
    validateStatus(status) {
      // If not authenticated, we'll get 401 code
      return status < 500;
    }
  });

  _responseHelper(dispatch, response, (dispatch, response) => {
    dispatch({
      type: FETCH_PAYMENT_METHODS,
      payload: response.data.data
    });
  });
};

export const sendPaymentRequests = (titleCaption, friendAmounts) => async dispatch => {
  const payRequestPath = 'venmoUsers/me/pay-or-request';
  const payloads = friendAmounts.map(({ friendId, amount }) => {
    return {
      note: titleCaption,
      amount: amount * -1,
      user_id: friendId,
      audience: 'private'
    };
  });

  const response = await splitbill.post(payRequestPath, { payloads });
  // TODO: Code some proper post-request behavior
  history.push('/main-app');
};

export const addFriendToBill = (friendId) => {
  return {
    type: ADD_FRIEND_BILL,
    payload: friendId
  };
};

export const removeFriendFromBill = (friendId) => {
  return {
    type: REMOVE_FRIEND_BILL,
    payload: friendId
  };
};
