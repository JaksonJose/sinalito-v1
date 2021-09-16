import { combineReducers } from 'redux';
import { userCourse } from './reducer/userCourse';
import { userLesson } from './reducer/userLesson';

export default combineReducers({
  userCourse,
  userLesson,
});