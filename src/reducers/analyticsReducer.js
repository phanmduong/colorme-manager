/**
 * Created by phanmduong on 5/23/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function dashboardReducer(
  state = initialState.analytics,
  action,
) {
  switch (action.type) {
    case types.BEGIN_DATA_ANALYTICS_REGISTER_LOAD:
      return Object.assign({}, state, {
        isLoadingAnalyticsRegister: action.isLoadingAnalyticsRegister,
        errorAnalyticsRegister: action.errorAnalyticsRegister,
      });
    case types.LOAD_DATA_ANALYTICS_REGISTER_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingAnalyticsRegister: action.isLoadingAnalyticsRegister,
        errorAnalyticsRegister: action.errorAnalyticsRegister,
        analyticsRegister: action.analyticsRegister,
      });
    case types.LOAD_DATA_ANALYTICS_REGISTER_ERROR:
      return Object.assign({}, state, {
        isLoadingAnalyticsRegister: action.isLoadingAnalyticsRegister,
        errorAnalyticsRegister: action.errorAnalyticsRegister,
      });
    case types.BEGIN_DATA_ANALYTICS_REVENUE_LOAD:
      return Object.assign({}, state, {
        isLoadingAnalyticsRevenue: action.isLoadingAnalyticsRevenue,
        errorAnalyticsRevenue: action.errorAnalyticsRevenue,
      });
    case types.LOAD_DATA_ANALYTICS_REVENUE_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingAnalyticsRevenue: action.isLoadingAnalyticsRevenue,
        errorAnalyticsRevenue: action.errorAnalyticsRevenue,
        analyticsRevenue: action.analyticsRevenue,
      });
    case types.LOAD_DATA_ANALYTICS_REVENUE_ERROR:
      return Object.assign({}, state, {
        isLoadingAnalyticsRevenue: action.isLoadingAnalyticsRevenue,
        errorAnalyticsRevenue: action.errorAnalyticsRevenue,
      });
    case types.BEGIN_DATA_ANALYTICS_KPI_LOAD:
      return Object.assign({}, state, {
        isLoadingAnalyticsKPI: action.isLoadingAnalyticsKPI,
        errorAnalyticsKPI: action.errorAnalyticsKPI,
      });
    case types.LOAD_DATA_ANALYTICS_KPI_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingAnalyticsKPI: action.isLoadingAnalyticsKPI,
        errorAnalyticsKPI: action.errorAnalyticsKPI,
        analyticsKpis: action.analyticsKpis,
      });
    case types.LOAD_DATA_ANALYTICS_KPI_ERROR:
      return Object.assign({}, state, {
        isLoadingAnalyticsKPI: action.isLoadingAnalyticsKPI,
        errorAnalyticsKPI: action.errorAnalyticsKPI,
      });
    case types.BEGIN_DATA_ANALYTICS_CLASSES_LOAD:
      return Object.assign({}, state, {
        isLoadingAnalyticsClasses: action.isLoadingAnalyticsClasses,
        errorAnalyticsClasses: action.errorAnalyticsClasses,
      });
    case types.LOAD_DATA_ANALYTICS_CLASSES_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingAnalyticsClasses: action.isLoadingAnalyticsClasses,
        errorAnalyticsClasses: action.errorAnalyticsClasses,
        analyticsClasses: action.analyticsClasses,
      });
    case types.LOAD_DATA_ANALYTICS_CLASSES_ERROR:
      return Object.assign({}, state, {
        isLoadingAnalyticsClasses: action.isLoadingAnalyticsClasses,
        errorAnalyticsClasses: action.errorAnalyticsClasses,
      });
    case types.SELECTED_BASE_ID_ANALYTICS:
      return Object.assign({}, state, {
        selectedBaseId: action.selectedBaseId,
      });
    case types.SELECTED_GEN_ID_ANALYTICS:
      return Object.assign({}, state, {
        selectedGenId: action.selectedGenId,
      });
    case types.SELECTED_START_DATE_ANALYTICS:
      return Object.assign({}, state, {
        startDate: action.startDate,
        enrollStart: action.enrollStart,
      });
    case types.SELECTED_END_DATE_ANALYTICS:
      return Object.assign({}, state, {
        endDate: action.endDate,
        enrollEnd: action.enrollEnd,
      });
    case types.SELECTED_COURSE_ID_ANALYTICS:
      return Object.assign({}, state, {
        selectedCourseId: action.selectedCourseId,
      });
    case types.SELECTED_CAMPAIGN_ID_ANALYTICS:
      return Object.assign({}, state, {
        selectedCampaignId: action.selectedCampaignId,
      });
    case types.SELECTED_SOURCE_ID_ANALYTICS:
      return Object.assign({}, state, {
        selectedSourceId: action.selectedSourceId,
      });
    case types.SELECTED_STAFF_ID_ANALYTICS:
      return Object.assign({}, state, {
        selectedStaffId: action.selectedStaffId,
      });
    case types.SELECTED_CLASS_TYPE_ANALYTICS:
      return Object.assign({}, state, {
        classType: action.classType,
      });
    default:
      return state;
  }
}
