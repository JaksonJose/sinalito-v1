import { combineReducers } from 'redux';
import { userCourse } from './userCourse/userCourse';
import { userLesson } from './userLesson/userLesson';

export default combineReducers({
  userCourse,
  userLesson,
});