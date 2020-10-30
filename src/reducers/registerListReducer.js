/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function registerListReducer(
  state = initialState.registerList,
  action,
) {
  switch (action.type) {
    case types.BEGIN_DATA_REGISTER_LIST_LOAD_MY:
      return Object.assign({}, state, {
        isLoadingMy: action.isLoadingMy,
        errorMy: action.errorMy,
      });
    case types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL_MY:
      let registerListDataMy =
        action.currentPageMy === 1
          ? action.registerListDataMy
          : [...state.registerListDataMy, ...action.registerListDataMy];
      return Object.assign({}, state, {
        isLoadingMy: action.isLoadingMy,
        errorMy: action.errorMy,
        registerListDataMy: registerListDataMy,
        currentPageMy: action.currentPageMy,
        totalPageMy: action.totalPageMy,
        salerId: action.salerId,
        search_coupon: action.search_coupon,
      });
    case types.LOAD_DATA_REGISTER_LIST_ERROR_MY:
      return Object.assign({}, state, {
        isLoadingMy: action.isLoadingMy,
        errorMy: action.errorMy,
      });
    case types.UPDATE_FORM_SEARCH_REGISTER_LIST_MY:
      return Object.assign({}, state, {
        searchMy: action.searchMy,
        registerListDataMy: action.registerListDataMy,
        currentPageMy: action.currentPageMy,
        totalPageMy: action.totalPageMy,
      });
    case types.RESET_PAGE_REGISTER_LIST_MY:
      return Object.assign({}, state, {
        registerListDataMy: action.registerListDataMy,
        currentPageMy: action.currentPageMy,
        totalPageMy: action.totalPageMy,
      });
    case types.SELECT_REGISTER_LIST_SALER:
      return Object.assign({}, state, {
        salerId: action.salerId,
      });
    case types.SELECT_REGISTER_LIST_CAMPAIGN:
      return Object.assign({}, state, {
        campaignId: action.campaignId,
      });
    case types.SELECT_REGISTER_LIST_PAID_STATUS:
      return Object.assign({}, state, {
        paidStatus: action.paidStatus,
      });
    case types.SELECT_REGISTER_LIST_CLASS_STATUS: {
      return Object.assign({}, state, {
        classStatus: action.classStatus,
      });
    }
    case types.SELECT_REGISTER_LIST_CALL_STATUS:
      return Object.assign({}, state, {
        callStatus: action.callStatus,
      });
    case types.SELECT_REGISTER_LIST_BOOKMARK:
      return Object.assign({}, state, {
        bookmark: action.bookmark,
      });
    case types.SELECT_REGISTER_LIST_START_TIME:
      return Object.assign({}, state, {
        start_time: action.start_time,
      });
    case types.SELECT_REGISTER_LIST_END_TIME:
      return Object.assign({}, state, {
        end_time: action.end_time,
      });
    case types.SELECT_REGISTER_LIST_APPOINTMENT_PAYMENT:
      return Object.assign({}, state, {
        appointmentPayment: action.appointmentPayment,
      });
    case types.SELECT_REGISTER_LIST_SOURCE:
      return Object.assign({}, state, {
        source_id: action.source_id,
      });
    case types.SELECT_REGISTER_LIST_STATUS:
      return Object.assign({}, state, {
        status_id: action.status_id,
      });
    case types.SELECT_REGISTER_LIST_CLASS:
      return Object.assign({}, state, {
        classId: action.classId,
      });
    case types.RESET_REGISTER_LIST_FILTER:
      return Object.assign({}, state, {
        salerId: action.salerId,
        campaignId: action.campaignId,
        paidStatus: action.paidStatus,
        classStatus: action.classStatus,
        callStatus: action.callStatus,
        bookmark: action.bookmark,
        search_coupon: action.search_coupon,
        start_time: action.start_time,
        end_time: action.end_time,
        appointmentPayment: action.appointmentPayment,
        source_id: action.source_id,
        status_id: action.status_id,
        classId: action.classId,
      });
    case types.SET_AUTOFOCUS_REGISTER_LIST_SEARCH:
      return Object.assign({}, state, {
        autoFocusRegisterListSearch: action.autoFocusRegisterListSearch,
      });
    case types.BEGIN_LOAD_REGISTER_LIST_AVAILABLE_CLASSES:
      return Object.assign({}, state, {
        isLoadingClasses: action.isLoadingClasses,
        errorClasses: action.errorClasses,
      });
    case types.LOAD_REGISTER_LIST_AVAILABLE_CLASSES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingClasses: action.isLoadingClasses,
        errorClasses: action.errorClasses,
        classes: action.classes,
      });
    case types.LOAD_REGISTER_LIST_AVAILABLE_CLASSES_ERROR:
      return Object.assign({}, state, {
        isLoadingClasses: action.isLoadingClasses,
        errorClasses: action.errorClasses,
      });
    case types.RESET_REGISTER_LIST_AVAILABLE_CLASSES:
      return Object.assign({}, state, {
        classes: action.classes,
        changeClassStatus: action.changeClassStatus,
      });
    case types.BEGIN_CHANGE_STUDENT_CLASS:
      return Object.assign({}, state, {
        changingClass: action.changingClass,
        errorChangeClass: action.errorChangeClass,
      });
    case types.CHANGE_STUDENT_CLASS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingClasses: action.isLoadingClasses,
        changingClass: action.changingClass,
        errorChangeClass: action.errorChangeClass,
        changeClassStatus: action.changeClassStatus,
      });
    case types.CHANGE_STUDENT_CLASS_ERROR:
      return Object.assign({}, state, {
        changingClass: action.changingClass,
        errorChangeClass: action.errorChangeClass,
        changeClassStatus: action.changeClassStatus,
      });
    case types.BEGIN_LOAD_REGISTER_LIST_COURSES:
      return Object.assign({}, state, {
        isLoadingCourses: action.isLoadingCourses,
        errorCourses: action.errorCourses,
      });
    case types.LOAD_REGISTER_LIST_COURSES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingCourses: action.isLoadingCourses,
        errorCourses: action.errorCourses,
        courses: action.courses,
      });
    case types.LOAD_REGISTER_LIST_COURSES_ERROR:
      return Object.assign({}, state, {
        isLoadingCourses: action.isLoadingCourses,
        errorCourses: action.errorCourses,
      });
    case types.SELECT_REGISTER_LIST_COURSE:
      return Object.assign({}, state, {
        courseId: action.courseId,
      });
    default:
      return state;
  }
}
