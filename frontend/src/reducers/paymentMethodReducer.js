import {
  FETCH_PAYMENT_METHODS
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PAYMENT_METHODS:
      return action.payload;
    default:
      return state;
  }
};
