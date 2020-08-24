import splitbill from '../apis/splitbill';
import {
  FETCH_FRIEND_LIST,
  FETCH_PAYMENT_METHODS,
  USER_LOGGED_IN,
  USER_NOT_LOGGED_IN,
  VENMO_LOGGED_IN,
  VENMO_NOT_LOGGED_IN,
  VENMO_UNKNOWN_LOGGED_IN
} from './types';

export const userLogin = () => {
  return {
    type: USER_LOGGED_IN
  };
};

const userLogout = () => {
  return {
    type: USER_NOT_LOGGED_IN
  };
};

export const venmoLogin = () => {
  return {
    type: VENMO_LOGGED_IN
  };
};

const venmoLogout = () => {
  return {
    type: VENMO_NOT_LOGGED_IN
  };
};

const venmoUnknown = () => {
  return {
    type: VENMO_UNKNOWN_LOGGED_IN
  };
};

export const deleteUserAccount = () => async dispatch => {
  await splitbill.delete('/users/me');
  // If successful, we know the person is logged out
  dispatch(userLogout());
  dispatch(venmoUnknown());
};

const _responseHelper = (dispatch, response, successCb) => {
  if (response.status === 200) {
    // Successfully fetched the list of friends
    // That means we're authenticated for both user and venmo
    dispatch(userLogin());
    dispatch(venmoLogin());

    // Call the successful callback
    successCb(dispatch, response);
  } else if (response.status === 401) {
    // Unauthorized
    // If response payload code is 401, user authorization needed
    // If response payload code is 402, Venmo authorization needed
    if (response.data.error.code === 401) {
      dispatch(userLogout());
    } else if (response.data.error.code === 402) {
      // User authenticated but not Venmo authenticated
      dispatch(userLogin());
      dispatch(venmoLogout());
    }
  }
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
