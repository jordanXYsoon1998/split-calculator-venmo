import { combineReducers } from 'redux';
import authReducer from './auth';
import venmoReducer from './venmo';

export default combineReducers({
  auth: authReducer,
  venmo: venmoReducer
});
