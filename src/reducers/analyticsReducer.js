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
    case types.SELECTED_BASE_ID_ANALYTICS:
      return Object.assign({}, state, {
        selectedBaseId: action.selectedBaseId,
      });
    case types.SELECTED_START_DATE_ANALYTICS:
      return Object.assign({}, state, {
        startDate: action.startDate,
      });
    case types.SELECTED_END_DATE_ANALYTICS:
      return Object.assign({}, state, {
        endDate: action.endDate,
      });
    default:
      return state;
  }
}
