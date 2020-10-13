import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function kpiReducer(state = initialState.kpi, action) {
  switch (action.type) {
    case types.BEGIN_LOAD_KPI:
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
      });
    case types.BEGIN_REFRESH_KPI:
      return Object.assign({}, state, {
        refreshing: action.refreshing,
        error: action.error,
      });
    case types.LOAD_KPI_SUCCESSFUL:
      const kpis =
        action.currentPage === 1
          ? action.kpis
          : [...state.kpis, ...action.kpis];
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
        refreshing: action.refreshing,
        kpis: kpis,
        currentPage: action.currentPage,
        totalPage: action.totalPage,
      });
    case types.LOAD_KPI_ERROR:
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
        refreshing: action.refreshing,
      });
    case types.RESET_KPI:
      return Object.assign({}, state, {
        kpis: action.kpis,
        currentPage: action.currentPage,
        totalPage: action.totalPage,
        search: action.search,
        type: action.kpiType,
        calculateBy: action.calculateBy,
      });
    case types.SELECTED_KPI_TYPE:
      return Object.assign({}, state, {
        type: action.kpiType,
      });
    case types.SELECTED_KPI_CALCULATE_BY:
      return Object.assign({}, state, {
        calculateBy: action.calculateBy,
      });
    case types.SELECTED_KPI_START_TIME:
      return Object.assign({}, state, {
        startTime: action.startTime,
      });
    case types.SELECTED_KPI_END_TIME:
      return Object.assign({}, state, {
        endTime: action.endTime,
      });
    default:
      return state;
  }
}
