import * as types from '../constants/actionTypes';
import * as staffApi from '../apis/staffApi';

import axios from 'axios';
let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function getStaff(refreshing, page, search, token, domain) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginLoadStaff());
    } else {
      dispatch(beginRefreshStaff());
    }
    staffApi
      .getStaff(sourceCancel, page, search, token, domain)
      .then(function (res) {
        dispatch(loadStaffSuccessful(res));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(loadStaffError());
          throw error;
        }
      });
  };
}

function beginLoadStaff() {
  return {
    type: types.BEGIN_LOAD_MANAGE_STAFF,
    isLoadingStaff: true,
    errorStaff: false,
  };
}

function loadStaffSuccessful(res) {
  return {
    type: types.LOAD_MANAGE_STAFF_SUCCESSFUL,
    staff: res.data.employees.items,
    isLoadingStaff: false,
    errorStaff: false,
    currentPage: res.data.employees.meta.current_page,
    totalPage: res.data.employees.meta.total_pages,
    refreshingStaff: false,
  };
}

function loadStaffError() {
  return {
    type: types.LOAD_MANAGE_STAFF_ERROR,
    isLoadingStaff: false,
    errorStaff: true,
    refreshingStaff: false,
  };
}

function beginSearchStaff(search) {
  return {
    type: types.BEGIN_SEARCH_MANAGE_STAFF,
    currentPage: 1,
    totalPage: 1,
    search: search,
    staff: [],
  };
}

export function searchStaff(search, token, domain) {
  sourceCancel.cancel('Canceled by staff api.');
  sourceCancel = CancelToken.source();
  return function (dispatch) {
    dispatch(beginSearchStaff(search));
    dispatch(getStaff(false, 1, search, token, domain));
  };
}

function beginRefreshStaff() {
  return {
    type: types.BEGIN_REFRESH_MANAGE_STAFF,
    refreshingStaff: true,
    errorLeads: false,
  };
}

export function refreshStaff(search, token, domain) {
  return function (dispatch) {
    dispatch(beginSearchStaff(search));
    dispatch(getStaff(true, 1, search, token, domain));
  };
}

export function resetStaff() {
  return {
    type: types.RESET_MANAGE_STAFF,
    staff: [],
    search: '',
    currentPage: 0,
    totalPage: 1,
  };
}
