/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';
import axios from 'axios';
import {selectedGenId} from './genActions';
import {selectedBaseId} from './baseActions';
let CancelToken = axios.CancelToken;
let sourceCancelMy = CancelToken.source();

export function beginDataRegisterListLoadMy() {
  return {
    type: types.BEGIN_DATA_REGISTER_LIST_LOAD_MY,
    isLoadingMy: true,
    errorMy: false,
  };
}

export function loadDataRegisterListMy(
  page,
  search,
  note,
  employee_ids,
  course_ids,
  base_ids,
  province_ids,
  status_ids,
  class_ids,
  source_ids,
  campaign_ids,
  coupon_ids,
  class_types,
  call_statuses,
  tuition_status,
  bookmark,
  call_back_time_start_time,
  call_back_time_end_time,
  appointment_payment_start_time,
  appointment_payment_end_time,
  start_time,
  end_time,
  orderBy,
  sortedBy,
  token,
  domain,
) {
  return function (dispatch) {
    dispatch(beginDataRegisterListLoadMy());
    studentApi
      .loadRegisterListApi(
        sourceCancelMy,
        page,
        search,
        note,
        employee_ids,
        course_ids,
        base_ids,
        province_ids,
        status_ids,
        class_ids,
        source_ids,
        campaign_ids,
        coupon_ids,
        class_types,
        call_statuses,
        tuition_status,
        bookmark,
        call_back_time_start_time,
        call_back_time_end_time,
        appointment_payment_start_time,
        appointment_payment_end_time,
        start_time,
        end_time,
        orderBy,
        sortedBy,
        token,
        domain,
      )
      .then(function (res) {
        dispatch(loadDataSuccessfulMy(res, employee_ids));
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

export function loadDataSuccessfulMy(res, salerId) {
  return {
    type: types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL_MY,
    registerListDataMy: res.data.registers.items,
    currentPageMy: res.data.registers.meta.current_page,
    totalPageMy: res.data.registers.meta.total_pages,
    isLoadingMy: false,
    errorMy: false,
    refreshingMy: false,
    salerId: salerId,
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
  search,
  note,
  employee_ids,
  course_ids,
  base_ids,
  province_ids,
  status_ids,
  class_ids,
  source_ids,
  campaign_ids,
  coupon_ids,
  class_types,
  call_statuses,
  tuition_status,
  bookmark,
  call_back_time_start_time,
  call_back_time_end_time,
  appointment_payment_start_time,
  appointment_payment_end_time,
  start_time,
  end_time,
  orderBy,
  sortedBy,
  token,
  domain,
) {
  sourceCancelMy.cancel('Canceled by api register list (my).');
  sourceCancelMy = CancelToken.source();
  return (dispatch) => {
    dispatch(updateFormSearchMy(search));
    dispatch(
      loadDataRegisterListMy(
        1,
        search,
        note,
        employee_ids,
        course_ids,
        base_ids,
        province_ids,
        status_ids,
        class_ids,
        source_ids,
        campaign_ids,
        coupon_ids,
        class_types,
        call_statuses,
        tuition_status,
        bookmark,
        call_back_time_start_time,
        call_back_time_end_time,
        appointment_payment_start_time,
        appointment_payment_end_time,
        start_time,
        end_time,
        orderBy,
        sortedBy,
        token,
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
  search,
  note,
  employee_ids,
  course_ids,
  base_ids,
  province_ids,
  status_ids,
  class_ids,
  source_ids,
  campaign_ids,
  coupon_ids,
  class_types,
  call_statuses,
  tuition_status,
  bookmark,
  call_back_time_start_time,
  call_back_time_end_time,
  appointment_payment_start_time,
  appointment_payment_end_time,
  start_time,
  end_time,
  orderBy,
  sortedBy,
  token,
  domain,
) {
  return (dispatch) => {
    dispatch(resetRegisterListMy());
    dispatch(
      loadDataRegisterListMy(
        1,
        search,
        note,
        employee_ids,
        course_ids,
        base_ids,
        province_ids,
        status_ids,
        class_ids,
        source_ids,
        campaign_ids,
        coupon_ids,
        class_types,
        call_statuses,
        tuition_status,
        bookmark,
        call_back_time_start_time,
        call_back_time_end_time,
        appointment_payment_start_time,
        appointment_payment_end_time,
        start_time,
        end_time,
        orderBy,
        sortedBy,
        token,
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

export function onSelectAppointmentPaymentStartTime(date) {
  return {
    type: types.SELECT_REGISTER_LIST_APPOINTMENT_PAYMENT_START_TIME,
    appointmentPaymentStartTime: date,
  };
}

export function onSelectAppointmentPaymentEndTime(date) {
  return {
    type: types.SELECT_REGISTER_LIST_APPOINTMENT_PAYMENT_END_TIME,
    appointmentPaymentEndTime: date,
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

export function setAutoFocusRegisterListSearch(bool) {
  return {
    type: types.SET_AUTOFOCUS_REGISTER_LIST_SEARCH,
    autoFocusRegisterListSearch: bool,
  };
}

export function loadAvailableClasses(registerId, search, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadAvailableClasses());
    studentApi
      .loadAvailableClasses(registerId, search, token, domain)
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

export function changeClass(classId, registerId, token, domain) {
  return function (dispatch) {
    dispatch(beginChangeClass());
    studentApi
      .changeClass(classId, registerId, token, domain)
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

export function loadCourses(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadCourses());
    studentApi
      .loadCourses(token, domain)
      .then((res) => {
        dispatch(loadCoursesSuccess(res));
      })
      .catch((error) => {
        dispatch(loadCoursesError());
        throw error;
      });
  };
}

function beginLoadCourses() {
  return {
    type: types.BEGIN_LOAD_REGISTER_LIST_COURSES,
    isLoadingCourses: true,
    errorCourses: false,
  };
}

function loadCoursesSuccess(res) {
  return {
    type: types.LOAD_REGISTER_LIST_COURSES_SUCCESSFUL,
    isLoadingCourses: false,
    errorCourses: false,
    courses: res.data.data.courses,
  };
}

function loadCoursesError() {
  return {
    type: types.LOAD_REGISTER_LIST_COURSES_ERROR,
    isLoadingCourses: false,
    errorCourses: true,
  };
}

export function onSelectCourseId(courseId) {
  return {
    type: types.SELECT_REGISTER_LIST_COURSE,
    courseId: courseId,
  };
}

export function onSelectDateTest(date) {
  return {
    type: types.SELECT_REGISTER_LIST_DATE_TEST,
    dateTest: date,
  };
}

export function onSelectCallBackStartTime(date) {
  return {
    type: types.SELECT_REGISTER_LIST_CALL_BACK_START_TIME,
    callBackStartTime: date,
  };
}

export function onSelectCallBackEndTime(date) {
  return {
    type: types.SELECT_REGISTER_LIST_CALL_BACK_END_TIME,
    callBackEndTime: date,
  };
}

export function onSelectBaseId(baseId) {
  return {
    type: types.SELECT_REGISTER_LIST_BASE,
    baseId,
  };
}

export function onSelectProvinceId(provinceId) {
  return {
    type: types.SELECT_REGISTER_LIST_PROVINCE,
    provinceId,
  };
}

export function onSelectCouponId(couponId) {
  return {
    type: types.SELECT_REGISTER_LIST_COUPON,
    couponId,
  };
}

export function onChangeNote(note) {
  return {
    type: types.CHANGE_REGISTER_LIST_NOTE,
    note,
  };
}
