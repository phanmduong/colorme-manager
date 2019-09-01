/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.course, action) {
  switch (action.type) {
    case types.BEGIN_DATA_COURSE_LOAD:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.LOAD_DATA_COURSE_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        courseData: action.courseData,
      });
    case types.LOAD_DATA_COURSE_ERROR:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.SELECTED_COURSE_ID:
      return Object.assign({}, state, {
        selectedCourseId: action.selectedCourseId,
      });
    default:
      return state;
  }
}
