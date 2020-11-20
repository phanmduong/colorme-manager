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
    case types.BEGIN_LOAD_KPI_SETTINGS:
      return Object.assign({}, state, {
        loadingSettings: action.loadingSettings,
        errorSettings: action.errorSettings,
      });
    case types.LOAD_KPI_SETTINGS_SUCCESS:
      return Object.assign({}, state, {
        loadingSettings: action.loadingSettings,
        errorSettings: action.errorSettings,
        settings: action.settings,
      });
    case types.LOAD_KPI_SETTINGS_ERROR:
      return Object.assign({}, state, {
        loadingSettings: action.loadingSettings,
        errorSettings: action.errorSettings,
      });
    case types.BEGIN_LOAD_KPI_EMPLOYEES:
      return Object.assign({}, state, {
        loadingEmployees: action.loadingEmployees,
        errorEmployees: action.errorEmployees,
      });
    case types.LOAD_KPI_EMPLOYEES_SUCCESS:
      return Object.assign({}, state, {
        employees: action.employees,
        loadingEmployees: action.loadingEmployees,
        errorEmployees: action.errorEmployees,
      });
    case types.LOAD_KPI_EMPLOYEES_ERROR:
      return Object.assign({}, state, {
        loadingEmployees: action.loadingEmployees,
        errorEmployees: action.errorEmployees,
      });
    case types.BEGIN_ADD_KPIS:
      return Object.assign({}, state, {
        addingKpis: action.addingKpis,
        errorAddKpis: action.errorAddKpis,
      });
    case types.ADD_KPIS_SUCCESS:
      return Object.assign({}, state, {
        addingKpis: action.addingKpis,
        errorAddKpis: action.errorAddKpis,
      });
    case types.ADD_KPIS_ERROR:
      return Object.assign({}, state, {
        addingKpis: action.addingKpis,
        errorAddKpis: action.errorAddKpis,
      });
    case types.BEGIN_LOAD_KPI_CAMPAIGNS:
      return Object.assign({}, state, {
        loadingCampaigns: action.loadingCampaigns,
        errorCampaigns: action.errorCampaigns,
      });
    case types.LOAD_KPI_CAMPAIGNS_SUCCESS:
      return Object.assign({}, state, {
        loadingCampaigns: action.loadingCampaigns,
        errorCampaigns: action.errorCampaigns,
        campaigns: action.campaigns,
      });
    case types.LOAD_KPI_CAMPAIGNS_ERROR:
      return Object.assign({}, state, {
        loadingCampaigns: action.loadingCampaigns,
        errorCampaigns: action.errorCampaigns,
      });
    case types.BEGIN_LOAD_KPI_SOURCES:
      return Object.assign({}, state, {
        loadingSources: action.loadingSources,
        errorSources: action.errorSources,
      });
    case types.LOAD_KPI_SOURCES_SUCCESS:
      return Object.assign({}, state, {
        loadingSources: action.loadingSources,
        errorSources: action.errorSources,
        sources: action.sources,
      });
    case types.LOAD_KPI_SOURCES_ERROR:
      return Object.assign({}, state, {
        loadingSources: action.loadingSources,
        errorSources: action.errorSources,
      });
    case types.BEGIN_LOAD_KPI_COURSES:
      return Object.assign({}, state, {
        loadingCourses: action.loadingCourses,
        errorCourses: action.errorCourses,
      });
    case types.LOAD_KPI_COURSES_SUCCESS:
      return Object.assign({}, state, {
        loadingCourses: action.loadingCourses,
        errorCourses: action.errorCourses,
        courses: action.courses,
      });
    case types.LOAD_KPI_COURSES_ERROR:
      return Object.assign({}, state, {
        loadingCourses: action.loadingCourses,
        errorCourses: action.errorCourses,
      });
    default:
      return state;
  }
}
