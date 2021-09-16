import { combineReducers } from 'redux';
import { userLessons } from './reducer/userLessons';
import { userActivity } from './reducer/userActivity';

export default combineReducers({
  userLessons,
  userActivity,
});