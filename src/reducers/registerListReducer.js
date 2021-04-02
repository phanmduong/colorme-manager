/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';
import {filteredData} from '../helper';

let filterData;

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
      filterData = filteredData(
        state.registerListDataMy,
        action.registerListDataMy,
      );
      let registerListDataMy =
        action.currentPageMy === 1
          ? action.registerListDataMy
          : [...state.registerListDataMy, ...filterData];
      return Object.assign({}, state, {
        isLoadingMy: action.isLoadingMy,
        errorMy: action.errorMy,
        registerListDataMy: registerListDataMy,
        currentPageMy: action.currentPageMy,
        totalPageMy: action.totalPageMy,
        salerId: action.salerId,
        search_coupon: action.search_coupon,
        note: action.note,
        refreshingMy: action.refreshingMy,
      });
    case types.LOAD_DATA_REGISTER_LIST_ERROR_MY:
      return Object.assign({}, state, {
        isLoadingMy: action.isLoadingMy,
        errorMy: action.errorMy,
        refreshingMy: action.refreshingMy,
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
        refreshingMy: action.refreshingMy,
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
    case types.SELECT_REGISTER_LIST_APPOINTMENT_PAYMENT_START_TIME:
      return Object.assign({}, state, {
        appointmentPaymentStartTime: action.appointmentPaymentStartTime,
      });
    case types.SELECT_REGISTER_LIST_APPOINTMENT_PAYMENT_END_TIME:
      return Object.assign({}, state, {
        appointmentPaymentEndTime: action.appointmentPaymentEndTime,
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
    case types.SELECT_REGISTER_LIST_DATE_TEST:
      return Object.assign({}, state, {
        dateTest: action.dateTest,
      });
    case types.SELECT_REGISTER_LIST_CALL_BACK_START_TIME:
      return Object.assign({}, state, {
        callBackStartTime: action.callBackStartTime,
      });
    case types.SELECT_REGISTER_LIST_CALL_BACK_END_TIME:
      return Object.assign({}, state, {
        callBackEndTime: action.callBackEndTime,
      });
    case types.SELECT_REGISTER_LIST_BASE:
      return Object.assign({}, state, {
        baseId: action.baseId,
      });
    case types.SELECT_REGISTER_LIST_PROVINCE:
      return Object.assign({}, state, {
        provinceId: action.provinceId,
      });
    case types.SELECT_REGISTER_LIST_COUPON:
      return Object.assign({}, state, {
        couponId: action.couponId,
      });
    case types.CHANGE_REGISTER_LIST_NOTE:
      return Object.assign({}, state, {
        note: action.note,
      });
    default:
      return state;
  }
}
