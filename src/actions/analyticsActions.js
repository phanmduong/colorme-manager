/**
 * Created by phanmduong on 5/23/17.
 */
import * as types from '../constants/actionTypes';
import * as analyticsApi from '../apis/analyticsApi';

export function beginDataDashboardLoad() {
  return {
    type: types.BEGIN_DATA_ANALYTICS_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataDashboard(baseId, genId, token, domain) {
  return function (dispatch) {
    dispatch(beginDataDashboardLoad());
    analyticsApi
      .loadDashboard(baseId, genId, token, domain)
      .then(function (res) {
        dispatch(loadDataDashboardSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadDataDashboardError());
        throw error;
      });
  };
}

export function loadDataDashboardSuccessful(res) {
  return {
    type: types.LOAD_DATA_ANALYTICS_SUCCESSFUL,
    dashboardData: res.data,
    isLoading: false,
    error: false,
  };
}

export function loadDataDashboardError() {
  return {
    type: types.LOAD_DATA_ANALYTICS_ERROR,
    isLoading: false,
    error: true,
  };
}

export function selectedBaseId(baseId) {
  return {
    type: types.SELECTED_BASE_ID_ANALYTICS,
    selectedBaseId: baseId,
  };
}

export function selectedGenId(genId) {
  return {
    type: types.SELECTED_GEN_ID_ANALYTICS,
    selectedGenId: genId,
  };
}

export function selectedStartDate(startDate) {
  return {
    type: types.SELECTED_START_DATE_ANALYTICS,
    startDate: startDate,
  };
}

export function selectedEndDate(endDate) {
  return {
    type: types.SELECTED_END_DATE_ANALYTICS,
    endDate: endDate,
  };
}
