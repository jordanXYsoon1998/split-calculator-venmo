import {
  FETCH_PAYMENT_METHODS,
  DELETE_PAYMENT_METHODS
} from '../../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PAYMENT_METHODS:
      return action.payload;
    case DELETE_PAYMENT_METHODS:
      return [];
    default:
      return state;
  }
};
