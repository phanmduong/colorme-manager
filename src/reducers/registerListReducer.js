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
    default:
      return state;
  }
}
