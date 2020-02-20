/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function classReducer(state = initialState.class, action) {
  switch (action.type) {
    case types.BEGIN_DATA_CLASS_LOAD:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.LOAD_DATA_CLASS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
        classData: action.classData,
      });
    case types.LOAD_DATA_CLASS_ERROR:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        error: action.error,
      });
    case types.BEGIN_DATA_CLASS_REFRESH:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        error: action.error,
      });
    case types.REFRESH_DATA_CLASS_SUCCESSFUL:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        error: action.error,
        classData: action.classData,
      });
    case types.REFRESH_DATA_CLASS_ERROR:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        error: action.error,
      });
    case types.BEGIN_DATA_COURSES_LOAD:
      return Object.assign({}, state, {
        isLoadingCourse: action.isLoading,
        error: action.error,
      });
    case types.LOAD_DATA_COURSES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingCourse: action.isLoading,
        error: action.error,
        courseData: action.courseData,
      });
    case types.LOAD_DATA_COURSES_ERROR:
      return Object.assign({}, state, {
        isLoadingCourse: action.isLoading,
        error: action.error,
      });
    case types.BEGIN_LOAD_BASE:
      return Object.assign({}, state, {
        isLoadingBase: action.isLoadingBase,
        errorLoadingBase: action.errorLoadingBase,
      });
    case types.LOAD_BASE_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingBase: action.isLoadingBase,
        errorLoadingBase: action.errorLoadingBase,
        baseData: action.baseData,
      });
    case types.LOAD_BASE_ERROR:
      return Object.assign({}, state, {
        isLoadingBase: action.isLoadingBase,
        errorLoadingBase: action.errorLoadingBase,
      });
    case types.SELECTED_CLASS_ID:
      return Object.assign({}, state, {
        selectedClassId: action.selectedClassId,
      });
    case types.BEGIN_LOAD_INFO_CREATE_CLASS:
      return Object.assign({}, state, {
        loadingInfoCreateClass: action.loadingInfoCreateClass,
        errorInfoCreateClass: action.errorInfoCreateClass,
      });
    case types.LOAD_INFO_CREATE_CLASS_SUCCESSFUL:
      return Object.assign({}, state, {
        loadingInfoCreateClass: action.loadingInfoCreateClass,
        errorInfoCreateClass: action.errorInfoCreateClass,
        schedules: action.schedules,
        rooms: action.rooms,
        courses: action.courses,
        genData: action.genData,
        staffs: action.staffs,
      });
    case types.LOAD_INFO_CREATE_CLASS_ERROR:
      return Object.assign({}, state, {
        loadingInfoCreateClass: action.loadingInfoCreateClass,
        errorInfoCreateClass: action.errorInfoCreateClass,
      });
    case types.BEGIN_ADD_CLASS:
      return Object.assign({}, state, {
        isUpdatingClass: action.isUpdatingClass,
        errorUpdatingClass: action.errorUpdatingClass,
      });
    case types.ADD_CLASS_SUCCESSFUL:
      return Object.assign({}, state, {
        isUpdatingClass: action.isUpdatingClass,
        errorUpdatingClass: action.errorUpdatingClass,
      });
    case types.ADD_CLASS_ERROR:
      return Object.assign({}, state, {
        isUpdatingClass: action.isUpdatingClass,
        errorUpdatingClass: action.errorUpdatingClass,
      });
    case types.BEGIN_LOAD_CLASS_INFO:
      return Object.assign({}, state, {
        loadingClassInfo: action.loadingClassInfo,
        errorClassInfo: action.errorClassInfo,
      });
    case types.LOAD_CLASS_INFO_SUCCESSFUL:
      return Object.assign({}, state, {
        loadingClassInfo: action.loadingClassInfo,
        errorClassInfo: action.errorClassInfo,
        classInfo: action.classInfo,
      });
    case types.LOAD_CLASS_INFO_ERROR:
      return Object.assign({}, state, {
        loadingClassInfo: action.loadingClassInfo,
        errorClassInfo: action.errorClassInfo,
      });
    case types.BEGIN_CHANGE_CLASS_STATUS:
      return Object.assign({}, state, {
        changingClassStatus: action.changingClassStatus,
        errorClassStatus: action.errorClassStatus,
      });
    case types.CHANGE_CLASS_STATUS_SUCCESSFUL:
      return Object.assign({}, state, {
        changingClassStatus: action.changingClassStatus,
        errorClassStatus: action.errorClassStatus,
      });
    case types.CHANGE_CLASS_STATUS_ERROR:
      return Object.assign({}, state, {
        changingClassStatus: action.changingClassStatus,
        errorClassStatus: action.errorClassStatus,
      });
    default:
      return state;
  }
}
