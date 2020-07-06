import * as types from '../constants/actionTypes';
import * as staffApi from '../apis/staffApi';

import axios from 'axios';
let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function getStaff(refreshing, page, search, token) {
  return function(dispatch) {
    if (!refreshing) {
      dispatch(beginLoadStaff());
    } else {
      dispatch(beginRefreshStaff());
    }
    staffApi
      .getStaff(sourceCancel, page, search, token)
      .then(function(res) {
        dispatch(loadStaffSuccessful(res));
      })
      .catch(error => {
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
    staff: res.data.staffs,
    isLoadingStaff: false,
    errorStaff: false,
    currentPage: res.data.paginator.current_page,
    totalPage: res.data.paginator.total_pages,
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

export function searchStaff(search, token) {
  sourceCancel.cancel('Canceled by api student list .');
  sourceCancel = CancelToken.source();
  return function(dispatch) {
    dispatch(beginSearchStaff(search));
    dispatch(getStaff(false, 1, search, token));
  };
}

function beginRefreshStaff() {
  return {
    type: types.BEGIN_REFRESH_MANAGE_STAFF,
    refreshingStaff: true,
    errorLeads: false,
  };
}

export function refreshStaff(search, token) {
  return function(dispatch) {
    dispatch(beginSearchStaff(search));
    dispatch(getStaff(true, 1, search, token));
  };
}
