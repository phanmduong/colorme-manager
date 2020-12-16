/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

let courses;

export default function courseReducer(state = initialState.course, action) {
  switch (action.type) {
    case types.BEGIN_DATA_COURSE_LOAD:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.BEGIN_DATA_COURSE_REFRESH:
      return Object.assign({}, state, {
        refreshing: action.refreshing,
        error: action.error,
      });
    case types.LOAD_DATA_COURSE_SUCCESSFUL:
      courses =
        action.currentPage === 1
          ? action.courseData
          : [...state.courseData, ...action.courseData];
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        courseData: courses,
        currentPage: action.currentPage,
        refreshing: action.refreshing,
      });
    case types.LOAD_DATA_COURSE_ERROR:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        refreshing: action.refreshing,
      });
    case types.SELECTED_COURSE_ID:
      return Object.assign({}, state, {
        selectedCourseId: action.selectedCourseId,
      });
    case types.BEGIN_DATA_COURSE_SEARCH:
      return Object.assign({}, state, {
        search: action.search,
        currentPage: action.currentPage,
        courseData: action.courseData,
      });
    case types.BEGIN_COURSE_STATUS_CHANGE:
      return Object.assign({}, state, {
        statusChanging: action.statusChanging,
      });
    case types.COURSE_STATUS_CHANGE_COMPLETE:
      return Object.assign({}, state, {
        statusChanging: action.statusChanging,
      });
    case types.BEGIN_LOAD_PARENT_COURSES:
      return Object.assign({}, state, {
        loadingParentCourses: action.loadingParentCourses,
        errorParentCourses: action.errorParentCourses,
      });
    case types.LOAD_PARENT_COURSES_SUCCESS:
      return Object.assign({}, state, {
        loadingParentCourses: action.loadingParentCourses,
        errorParentCourses: action.errorParentCourses,
        parentCourses: action.parentCourses,
      });
    case types.LOAD_PARENT_COURSES_ERROR:
      return Object.assign({}, state, {
        loadingParentCourses: action.loadingParentCourses,
        errorParentCourses: action.errorParentCourses,
      });
    case types.BEGIN_CREATE_COURSE:
      return Object.assign({}, state, {
        creating: action.creating,
      });
    case types.CREATE_COURSE_SUCCESS:
      courses = [...state.courseData];
      if (action.editMode) {
        const idx = courses.findIndex(
          (course) => course.id === action.course.id,
        );
        if (idx > -1) {
          courses.splice(idx, 1);
          courses.splice(idx, 0, action.course);
        }
      } else {
        courses.push(action.course);
      }
      return Object.assign({}, state, {
        courseData: courses,
      });
    case types.CREATE_COURSE_COMPLETE:
      return Object.assign({}, state, {
        creating: action.creating,
      });
    case types.BEGIN_LOAD_COURSE_DETAILS:
      return Object.assign({}, state, {
        loadingCourseDetails: action.loadingCourseDetails,
        errorCourseDetails: action.errorCourseDetails,
      });
    case types.LOAD_COURSE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        loadingCourseDetails: action.loadingCourseDetails,
        errorCourseDetails: action.errorCourseDetails,
        courseDetails: action.course,
      });
    case types.LOAD_COURSE_DETAILS_ERROR:
      return Object.assign({}, state, {
        loadingCourseDetails: action.loadingCourseDetails,
        errorCourseDetails: action.errorCourseDetails,
      });
    default:
      return state;
  }
}
