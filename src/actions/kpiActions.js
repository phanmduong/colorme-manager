import * as types from '../constants/actionTypes';
import * as kpiApi from '../apis/kpiApi';

import axios from 'axios';
let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function loadKPI(
  refreshing,
  search,
  page,
  type,
  calculate_by,
  start_time,
  end_time,
  token,
) {
  return function (dispatch) {
    if (refreshing) {
      dispatch(beginRefreshKPI());
    } else {
      dispatch(beginLoadKPI());
    }
    dispatch(beginLoadKPI());
    kpiApi
      .loadKPIs(
        sourceCancel,
        search,
        page,
        type,
        calculate_by,
        start_time,
        end_time,
        token,
      )
      .then((res) => {
        dispatch(loadKPISuccess(res));
      })
      .catch((error) => {
        dispatch(loadKPIError());
        throw error;
      });
  };
}

function beginLoadKPI() {
  return {
    type: types.BEGIN_LOAD_KPI,
    loading: true,
    error: false,
  };
}

function beginRefreshKPI() {
  return {
    type: types.BEGIN_REFRESH_KPI,
    refreshing: true,
    error: false,
  };
}

function loadKPISuccess(res) {
  return {
    type: types.LOAD_KPI_SUCCESSFUL,
    loading: false,
    error: false,
    refreshing: false,
    kpis: res.data.kpis.items,
    currentPage: res.data.kpis.meta.current_page,
    totalPage: res.data.kpis.meta.total_pages,
  };
}

function loadKPIError() {
  return {
    type: types.LOAD_KPI_ERROR,
    loading: false,
    error: true,
    refreshing: false,
  };
}

function beginSearchKPI(search) {
  return {
    type: types.BEGIN_SEARCH_KPI,
    search: search,
    currentPage: 1,
    totalPage: 1,
    kpis: [],
  };
}

export function searchKPI(
  search,
  type,
  calculate_by,
  start_time,
  end_time,
  token,
) {
  sourceCancel.cancel('Cancelled by KPI api');
  sourceCancel = CancelToken.source();
  return function (dispatch) {
    dispatch(beginSearchKPI());
    dispatch(
      loadKPI(
        false,
        search,
        1,
        type,
        calculate_by,
        start_time,
        end_time,
        token,
      ),
    );
  };
}

export function refreshKPI(
  search,
  type,
  calculate_by,
  start_time,
  end_time,
  token,
) {
  return function (dispatch) {
    dispatch(beginSearchKPI(search));
    dispatch(
      loadKPI(true, search, 1, type, calculate_by, start_time, end_time, token),
    );
  };
}

export function reset() {
  return {
    type: types.RESET_KPI,
    kpis: [],
    currentPage: 0,
    totalPage: 1,
    search: '',
  };
}
