/**
 * Created by phanmduong on 5/23/17.
 */
import * as types from '../constants/actionTypes';
import * as analyticsApi from '../apis/analyticsApi';

export function beginLoadAnalyticsRegister() {
  return {
    type: types.BEGIN_DATA_ANALYTICS_REGISTER_LOAD,
    isLoadingAnalyticsRegister: true,
    errorAnalyticsRegister: false,
  };
}

export function loadAnalyticsRegister(
  baseId,
  staffId,
  startTime,
  endTime,
  token,
  domain,
) {
  return function (dispatch) {
    dispatch(beginLoadAnalyticsRegister());
    analyticsApi
      .loadAnalyticsRegister(baseId, staffId, startTime, endTime, token, domain)
      .then(function (res) {
        dispatch(loadAnalyticsRegisterSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadAnalyticsRegisterError());
        throw error;
      });
  };
}

export function loadAnalyticsRegisterSuccessful(res) {
  return {
    type: types.LOAD_DATA_ANALYTICS_REGISTER_SUCCESSFUL,
    analyticsRegister: res.data.analytics,
    isLoadingAnalyticsRegister: false,
    errorAnalyticsRegister: false,
  };
}

export function loadAnalyticsRegisterError() {
  return {
    type: types.LOAD_DATA_ANALYTICS_REGISTER_ERROR,
    isLoadingAnalyticsRegister: false,
    errorAnalyticsRegister: true,
  };
}

export function loadAnalyticsRevenue(
  startTime,
  endTime,
  staffId,
  baseId,
  courseId,
  sourceId,
  campaignId,
  token,
  domain,
) {
  return function (dispatch) {
    dispatch(beginLoadAnalyticsRevenue());
    analyticsApi
      .loadAnalyticsRevenue(
        startTime,
        endTime,
        staffId,
        baseId,
        courseId,
        sourceId,
        campaignId,
        token,
        domain,
      )
      .then((res) => {
        dispatch(loadAnalyticsRevenueSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadAnalyticsRevenueError());
        throw error;
      });
  };
}

function beginLoadAnalyticsRevenue() {
  return {
    type: types.BEGIN_DATA_ANALYTICS_REVENUE_LOAD,
    isLoadingAnalyticsRevenue: true,
    errorAnalyticsRevenue: false,
  };
}

function loadAnalyticsRevenueSuccessful(res) {
  return {
    type: types.LOAD_DATA_ANALYTICS_REVENUE_SUCCESSFUL,
    isLoadingAnalyticsRevenue: false,
    errorAnalyticsRevenue: false,
    analyticsRevenue: res.data.analytics,
  };
}

function loadAnalyticsRevenueError() {
  return {
    type: types.LOAD_DATA_ANALYTICS_REVENUE_ERROR,
    isLoadingAnalyticsRevenue: false,
    errorAnalyticsRevenue: true,
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
