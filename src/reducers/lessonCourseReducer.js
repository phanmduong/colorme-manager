/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function lessonCourseReducer(
  state = initialState.lessonCourse,
  action,
) {
  switch (action.type) {
    case types.BEGIN_DATA_LESSON_COURSE_LOAD:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.LOAD_DATA_LESSON_COURSE_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        lessonCourseData: action.lessonCourseData,
      });
    case types.LOAD_DATA_LESSON_COURSE_ERROR:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.SELECTED_LESSON_COURSE_ID:
      return Object.assign({}, state, {
        selectedLessonCourseId: action.selectedLessonCourseId,
      });
    default:
      return state;
  }
}
