/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';
import axios from 'axios';
import {selectedGenId} from './genActions';
import {selectedBaseId} from './baseActions';
let CancelToken = axios.CancelToken;
let sourceCancelAll = CancelToken.source();
let sourceCancelMy = CancelToken.source();

export function beginDataRegisterListLoadMy() {
  return {
    type: types.BEGIN_DATA_REGISTER_LIST_LOAD_MY,
    isLoadingMy: true,
    errorMy: false,
  };
}

export function loadDataRegisterListMy(
  token,
  page,
  search,
  salerId,
  baseId,
  campaignId,
  paidStatus,
  classStatus,
  callStatus,
  bookmark,
  search_coupon,
  start_time,
  end_time,
  appointmentPayment,
  statusId,
  sourceId,
  genId,
  classId,
  domain,
) {
  return function (dispatch) {
    dispatch(beginDataRegisterListLoadMy());
    studentApi
      .loadRegisterListApi(
        token,
        page,
        search,
        salerId,
        sourceCancelMy,
        genId,
        campaignId,
        classId,
        paidStatus,
        baseId,
        appointmentPayment,
        classStatus,
        search_coupon,
        bookmark,
        callStatus,
        start_time,
        end_time,
        sourceId,
        statusId,
        domain,
      )
      .then(function (res) {
        dispatch(loadDataSuccessfulMy(res, salerId, search_coupon));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(loadDataErrorMy());
          throw error;
        }
      });
  };
}

export function loadDataSuccessfulMy(res, salerId, search_coupon) {
  return {
    type: types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL_MY,
    registerListDataMy: res.data.registers,
    currentPageMy: res.data.paginator.current_page,
    totalPageMy: res.data.paginator.total_pages,
    isLoadingMy: false,
    errorMy: false,
    refreshingMy: false,
    salerId: salerId,
    search_coupon: search_coupon,
  };
}

export function loadDataErrorMy() {
  return {
    type: types.LOAD_DATA_REGISTER_LIST_ERROR_MY,
    isLoadingMy: false,
    errorMy: true,
    refreshingMy: false,
  };
}

export function updateFormAndLoadDataSearchMy(
  searchMy,
  salerId,
  baseId,
  campaignId,
  paidStatus,
  classStatus,
  callStatus,
  bookmark,
  search_coupon,
  start_time,
  end_time,
  appointmentPayment,
  statusId,
  sourceId,
  genId,
  classId,
  token,
  domain,
) {
  sourceCancelMy.cancel('Canceled by api register list (my).');
  sourceCancelMy = CancelToken.source();
  return (dispatch) => {
    dispatch(updateFormSearchMy(searchMy));
    dispatch(
      loadDataRegisterListMy(
        token,
        1,
        searchMy,
        salerId,
        baseId,
        campaignId,
        paidStatus,
        classStatus,
        callStatus,
        bookmark,
        search_coupon,
        start_time,
        end_time,
        appointmentPayment,
        statusId,
        sourceId,
        genId,
        classId,
        domain,
      ),
    );
  };
}

export function updateFormSearchMy(searchMy) {
  return {
    type: types.UPDATE_FORM_SEARCH_REGISTER_LIST_MY,
    searchMy: searchMy,
    currentPageMy: 1,
    totalPageMy: 1,
    registerListDataMy: [],
  };
}

export function refreshRegisterListMy(
  searchMy,
  token,
  salerId,
  baseId,
  campaignId,
  paidStatus,
  classStatus,
  callStatus,
  bookmark,
  search_coupon,
  start_time,
  end_time,
  appointmentPayment,
  statusId,
  sourceId,
  genId,
  classId,
  domain,
) {
  return (dispatch) => {
    dispatch(resetRegisterListMy());
    dispatch(
      loadDataRegisterListMy(
        token,
        1,
        searchMy,
        salerId,
        baseId,
        campaignId,
        paidStatus,
        classStatus,
        callStatus,
        bookmark,
        search_coupon,
        start_time,
        end_time,
        appointmentPayment,
        statusId,
        sourceId,
        genId,
        classId,
        domain,
      ),
    );
  };
}

function resetRegisterListMy() {
  return {
    type: types.RESET_PAGE_REGISTER_LIST_MY,
    currentPageMy: 1,
    totalPageMy: 1,
    registerListDataMy: [],
    refreshingMy: true,
  };
}

export function onSelectSalerId(salerId) {
  return {
    type: types.SELECT_REGISTER_LIST_SALER,
    salerId: salerId,
  };
}

export function onSelectCampaignId(campaignId) {
  return {
    type: types.SELECT_REGISTER_LIST_CAMPAIGN,
    campaignId: campaignId,
  };
}

export function onSelectPaidStatus(paidStatus) {
  return {
    type: types.SELECT_REGISTER_LIST_PAID_STATUS,
    paidStatus: paidStatus,
  };
}

export function onSelectClassStatus(classStatus) {
  return {
    type: types.SELECT_REGISTER_LIST_CLASS_STATUS,
    classStatus: classStatus,
  };
}

export function onSelectCallStatus(callStatus) {
  return {
    type: types.SELECT_REGISTER_LIST_CALL_STATUS,
    callStatus: callStatus,
  };
}

export function onSelectBookmark(bookmark) {
  return {
    type: types.SELECT_REGISTER_LIST_BOOKMARK,
    bookmark: bookmark,
  };
}

export function onSelectStartTime(start_time) {
  return {
    type: types.SELECT_REGISTER_LIST_START_TIME,
    start_time: start_time,
  };
}

export function onSelectEndTime(end_time) {
  return {
    type: types.SELECT_REGISTER_LIST_END_TIME,
    end_time: end_time,
  };
}

export function onSelectAppointmentPayment(appointmentPayment) {
  return {
    type: types.SELECT_REGISTER_LIST_APPOINTMENT_PAYMENT,
    appointmentPayment: appointmentPayment,
  };
}

export function onSelectSource(sourceId) {
  return {
    type: types.SELECT_REGISTER_LIST_SOURCE,
    source_id: sourceId,
  };
}

export function onSelectStatus(statusId) {
  return {
    type: types.SELECT_REGISTER_LIST_STATUS,
    status_id: statusId,
  };
}

export function onSelectClassId(classId) {
  return {
    type: types.SELECT_REGISTER_LIST_CLASS,
    classId: classId,
  };
}

export function reset() {
  return function (dispatch) {
    dispatch(resetRegisterListProps());
    dispatch(selectedGenId(-1));
    dispatch(selectedBaseId(-1));
  };
}

function resetRegisterListProps() {
  return {
    type: types.RESET_REGISTER_LIST_FILTER,
    salerId: -1,
    campaignId: -1,
    paidStatus: -1,
    classStatus: '',
    callStatus: -1,
    bookmark: -1,
    search_coupon: '',
    start_time: '',
    end_time: '',
    appointmentPayment: '',
    source_id: -1,
    status_id: -1,
    classId: -1,
  };
}

export function setAutoFocusRegisterListSearch(bool) {
  return {
    type: types.SET_AUTOFOCUS_REGISTER_LIST_SEARCH,
    autoFocusRegisterListSearch: bool,
  };
}

export function loadAvailableClasses(registerId, search, token) {
  return function (dispatch) {
    dispatch(beginLoadAvailableClasses());
    studentApi
      .loadAvailableClasses(registerId, search, token)
      .then((res) => {
        dispatch(loadAvailableClassesSuccess(res));
      })
      .catch((error) => {
        dispatch(loadAvailableClassesError());
        throw error;
      });
  };
}

function beginLoadAvailableClasses() {
  return {
    type: types.BEGIN_LOAD_REGISTER_LIST_AVAILABLE_CLASSES,
    isLoadingClasses: true,
    errorClasses: false,
  };
}

function loadAvailableClassesSuccess(res) {
  return {
    type: types.LOAD_REGISTER_LIST_AVAILABLE_CLASSES_SUCCESSFUL,
    classes: res.data.data.classes,
    isLoadingClasses: false,
    errorClasses: false,
  };
}

function loadAvailableClassesError() {
  return {
    type: types.LOAD_REGISTER_LIST_AVAILABLE_CLASSES_ERROR,
    isLoadingClasses: false,
    errorClasses: true,
  };
}

export function resetAvailableClasses() {
  return {
    type: types.RESET_REGISTER_LIST_AVAILABLE_CLASSES,
    classes: [],
    changeClassStatus: null,
  };
}

export function changeClass(classId, registerId, token) {
  return function (dispatch) {
    dispatch(beginChangeClass());
    studentApi
      .changeClass(classId, registerId, token)
      .then((res) => dispatch(changeClassSuccess(res)))
      .catch((error) => {
        dispatch(changeClassError(error));
        throw error;
      });
  };
}

function beginChangeClass() {
  return {
    type: types.BEGIN_CHANGE_STUDENT_CLASS,
    changingClass: true,
    errorChangeClass: false,
  };
}

function changeClassSuccess(res) {
  return {
    type: types.CHANGE_STUDENT_CLASS_SUCCESSFUL,
    changingClass: false,
    errorChangeClass: false,
    changeClassStatus: res.status,
  };
}

function changeClassError(error) {
  return {
    type: types.CHANGE_STUDENT_CLASS_ERROR,
    changingClass: false,
    errorChangeClass: true,
    changeClassStatus: error.response.status,
  };
}
