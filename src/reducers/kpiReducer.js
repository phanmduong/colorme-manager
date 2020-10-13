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
      return Object.assign({}, state, {
        loading: action.loading,
        error: action.error,
        refreshing: action.refreshing,
        kpis: action.kpis,
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
      });
    default:
      return state;
  }
}
