/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';
import {isEmptyInput, itemExist} from '../helper';

let courses;
let courseDetails;
let lessonIdx;
let filterData;

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
      filterData = [];
      for (const item of action.courseData) {
        if (!itemExist(item, state.courseData)) {
          filterData.push(item);
        }
      }
      courses =
        action.currentPage === 1
          ? action.courseData
          : [...state.courseData, ...filterData];
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        courseData: courses,
        currentPage: action.currentPage,
        refreshing: action.refreshing,
        totalPage: action.totalPage,
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
        courses.unshift(action.course);
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
    case types.BEGIN_REFRESH_COURSE_DETAILS:
      return Object.assign({}, state, {
        refreshingCourseDetails: action.refreshingCourseDetails,
        errorCourseDetails: action.errorCourseDetails,
      });
    case types.LOAD_COURSE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        loadingCourseDetails: action.loadingCourseDetails,
        errorCourseDetails: action.errorCourseDetails,
        courseDetails: action.course,
        refreshingCourseDetails: action.refreshingCourseDetails,
      });
    case types.LOAD_COURSE_DETAILS_ERROR:
      return Object.assign({}, state, {
        loadingCourseDetails: action.loadingCourseDetails,
        errorCourseDetails: action.errorCourseDetails,
        refreshingCourseDetails: action.refreshingCourseDetails,
      });
    case types.RESET_DATA_COURSE:
      return Object.assign({}, state, {
        courseData: action.courseData,
        currentPage: action.currentPage,
        search: action.search,
        parentCourses: action.parentCourses,
        courseDetails: action.courseDetails,
      });
    case types.RESET_COURSE_DETAILS:
      return Object.assign({}, state, {
        courseDetails: action.courseDetails,
      });
    default:
      return state;
  }
}
