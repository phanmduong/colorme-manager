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

export function beginRefreshAnalyticsRegister() {
  return {
    type: types.BEGIN_DATA_ANALYTICS_REGISTER_REFRESH,
    refreshingAnalyticsRegister: true,
    errorAnalyticsRegister: false,
  };
}

export function loadAnalyticsRegister(
  refreshing,
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
    if (!refreshing) {
      dispatch(beginLoadAnalyticsRegister());
    } else {
      dispatch(beginRefreshAnalyticsRegister());
    }
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
    refreshingAnalyticsRegister: false,
  };
}

export function loadAnalyticsRegisterError() {
  return {
    type: types.LOAD_DATA_ANALYTICS_REGISTER_ERROR,
    isLoadingAnalyticsRegister: false,
    errorAnalyticsRegister: true,
    refreshingAnalyticsRegister: false,
  };
}

export function loadAnalyticsRevenue(
  refreshing,
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
    if (!refreshing) {
      dispatch(beginLoadAnalyticsRevenue());
    } else {
      dispatch(beginRefreshAnalyticsRevenue());
    }
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

function beginRefreshAnalyticsRevenue() {
  return {
    type: types.BEGIN_DATA_ANALYTICS_REVENUE_REFRESH,
    refreshingAnalyticsRevenue: true,
    errorAnalyticsRevenue: false,
  };
}

function loadAnalyticsRevenueSuccessful(res) {
  return {
    type: types.LOAD_DATA_ANALYTICS_REVENUE_SUCCESSFUL,
    isLoadingAnalyticsRevenue: false,
    errorAnalyticsRevenue: false,
    analyticsRevenue: res.data.analytics,
    refreshingAnalyticsRevenue: false,
  };
}

function loadAnalyticsRevenueError() {
  return {
    type: types.LOAD_DATA_ANALYTICS_REVENUE_ERROR,
    isLoadingAnalyticsRevenue: false,
    errorAnalyticsRevenue: true,
    refreshingAnalyticsRevenue: false,
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

export function loadAnalyticsClasses(
  refreshing,
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
    if (!refreshing) {
      dispatch(beginLoadAnalyticsClasses());
    } else {
      dispatch(beginRefreshAnalyticsClasses());
    }
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

function beginRefreshAnalyticsClasses() {
  return {
    type: types.BEGIN_DATA_ANALYTICS_CLASSES_REFRESH,
    refreshingAnalyticsClasses: true,
    errorAnalyticsClasses: false,
  };
}

function loadAnalyticsClassesSuccessful(res) {
  return {
    type: types.LOAD_DATA_ANALYTICS_CLASSES_SUCCESSFUL,
    isLoadingAnalyticsClasses: false,
    errorAnalyticsClasses: false,
    analyticsClasses: res.data.classes,
    refreshingAnalyticsClasses: false,
  };
}

function loadAnalyticsClassesError() {
  return {
    type: types.LOAD_DATA_ANALYTICS_CLASSES_ERROR,
    isLoadingAnalyticsClasses: false,
    errorAnalyticsClasses: true,
    refreshingAnalyticsClasses: false,
  };
}
