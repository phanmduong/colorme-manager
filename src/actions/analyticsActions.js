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
  courseId,
  sourceId,
  campaignId,
  token,
) {
  return function (dispatch) {
    dispatch(beginLoadAnalyticsRegister());
    analyticsApi
      .loadAnalyticsRegister(
        baseId,
        staffId,
        startTime,
        endTime,
        courseId,
        sourceId,
        campaignId,
        token,
      )
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
    enrollStart: startDate,
  };
}

export function selectedEndDate(endDate) {
  return {
    type: types.SELECTED_END_DATE_ANALYTICS,
    endDate: endDate,
    enrollEnd: endDate,
  };
}

export function selectedCampaignId(campaignId) {
  return {
    type: types.SELECTED_CAMPAIGN_ID_ANALYTICS,
    selectedCampaignId: campaignId,
  };
}

export function selectedSourceId(sourceId) {
  return {
    type: types.SELECTED_SOURCE_ID_ANALYTICS,
    selectedSourceId: sourceId,
  };
}

export function selectedCourseId(courseId) {
  return {
    type: types.SELECTED_COURSE_ID_ANALYTICS,
    selectedCourseId: courseId,
  };
}

export function selectedStaffId(staffId) {
  return {
    type: types.SELECTED_STAFF_ID_ANALYTICS,
    selectedStaffId: staffId,
  };
}

export function selectedClassType(type) {
  return {
    type: types.SELECTED_CLASS_TYPE_ANALYTICS,
    classType: type,
  };
}

export function loadAnalyticsKPI(
  startTime,
  endTime,
  baseId,
  courseId,
  sourceId,
  campaignId,
  staffId,
  token,
) {
  return function (dispatch) {
    dispatch(beginLoadAnalyticsKPI());
    analyticsApi
      .loadAnalyticsKPI(
        startTime,
        endTime,
        baseId,
        courseId,
        sourceId,
        campaignId,
        staffId,
        token,
      )
      .then((res) => {
        dispatch(loadAnalyticsKPISuccessful(res));
      })
      .catch((error) => {
        dispatch(loadAnalyticsKPIError());
        throw error;
      });
  };
}

function beginLoadAnalyticsKPI() {
  return {
    type: types.BEGIN_DATA_ANALYTICS_KPI_LOAD,
    isLoadingAnalyticsKPI: true,
    errorAnalyticsKPI: false,
  };
}

function loadAnalyticsKPISuccessful(res) {
  return {
    type: types.LOAD_DATA_ANALYTICS_KPI_SUCCESSFUL,
    isLoadingAnalyticsKPI: false,
    errorAnalyticsKPI: false,
    analyticsKpis: res.data.analytics,
  };
}

function loadAnalyticsKPIError() {
  return {
    type: types.LOAD_DATA_ANALYTICS_KPI_ERROR,
    isLoadingAnalyticsKPI: false,
    errorAnalyticsKPI: true,
  };
}

export function loadAnalyticsClasses(
  startDate,
  endDate,
  staffId,
  baseId,
  enrollStart,
  enrollEnd,
  courseId,
  sourceId,
  campaignId,
  token,
) {
  return function (dispatch) {
    dispatch(beginLoadAnalyticsClasses());
    analyticsApi
      .loadAnalyticsClasses(
        startDate,
        endDate,
        staffId,
        baseId,
        enrollStart,
        enrollEnd,
        courseId,
        sourceId,
        campaignId,
        token,
      )
      .then((res) => {
        dispatch(loadAnalyticsClassesSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadAnalyticsClassesError());
        throw error;
      });
  };
}

function beginLoadAnalyticsClasses() {
  return {
    type: types.BEGIN_DATA_ANALYTICS_CLASSES_LOAD,
    isLoadingAnalyticsClasses: true,
    errorAnalyticsClasses: false,
  };
}

function loadAnalyticsClassesSuccessful(res) {
  return {
    type: types.LOAD_DATA_ANALYTICS_CLASSES_SUCCESSFUL,
    isLoadingAnalyticsClasses: false,
    errorAnalyticsClasses: false,
    analyticsClasses: res.data.classes,
  };
}

function loadAnalyticsClassesError() {
  return {
    type: types.LOAD_DATA_ANALYTICS_CLASSES_ERROR,
    isLoadingAnalyticsClasses: false,
    errorAnalyticsClasses: true,
  };
}
