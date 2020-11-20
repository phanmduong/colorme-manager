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
  domain,
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
        domain,
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
  domain,
) {
  sourceCancel.cancel('Cancelled by KPI api');
  sourceCancel = CancelToken.source();
  return function (dispatch) {
    dispatch(beginSearchKPI(search));
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
        domain,
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
  domain,
) {
  return function (dispatch) {
    dispatch(beginSearchKPI(search));
    dispatch(
      loadKPI(
        true,
        search,
        1,
        type,
        calculate_by,
        start_time,
        end_time,
        token,
        domain,
      ),
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
    kpiType: '',
    calculateBy: '',
  };
}

export function selectedKPIType(kpiType) {
  return {
    type: types.SELECTED_KPI_TYPE,
    kpiType,
  };
}

export function selectedKPICalculateBy(calculateBy) {
  return {
    type: types.SELECTED_KPI_CALCULATE_BY,
    calculateBy,
  };
}

export function selectedKPIStartTime(startTime) {
  return {
    type: types.SELECTED_KPI_START_TIME,
    startTime,
  };
}

export function selectedKPIEndTime(endTime) {
  return {
    type: types.SELECTED_KPI_END_TIME,
    endTime,
  };
}

export function loadKPISettings(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadKPISettings());
    kpiApi
      .loadKPISettings(token, domain)
      .then((res) => {
        dispatch(loadKPISettingsSuccess(res));
      })
      .catch((error) => {
        dispatch(loadKPISettingsError());
        throw error;
      });
  };
}

function beginLoadKPISettings() {
  return {
    type: types.BEGIN_LOAD_KPI_SETTINGS,
    loadingSettings: true,
    errorSettings: false,
  };
}

function loadKPISettingsSuccess(res) {
  return {
    type: types.LOAD_KPI_SETTINGS_SUCCESS,
    loadingSettings: false,
    errorSettings: false,
    settings: res.data.settings,
  };
}

function loadKPISettingsError() {
  return {
    type: types.LOAD_KPI_SETTINGS_ERROR,
    loadingSettings: false,
    errorSettings: true,
  };
}

export function loadKPIEmployees(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadKPIEmployees());
    kpiApi
      .loadKPIEmployees(token, domain)
      .then((res) => {
        dispatch(loadKPIEmployeesSuccess(res));
      })
      .catch((error) => {
        dispatch(loadKPIEmployeesError());
        throw error;
      });
  };
}

function beginLoadKPIEmployees() {
  return {
    type: types.BEGIN_LOAD_KPI_EMPLOYEES,
    loadingEmployees: false,
    errorEmployees: false,
  };
}

function loadKPIEmployeesSuccess(res) {
  return {
    type: types.LOAD_KPI_EMPLOYEES_SUCCESS,
    employees: res.data.employees,
    loadingEmployees: false,
    errorEmployees: false,
  };
}

function loadKPIEmployeesError() {
  return {
    type: types.LOAD_KPI_EMPLOYEES_ERROR,
    loadingEmployees: false,
    errorEmployees: false,
  };
}

export function addKpis(kpiData, token, domain) {
  return function (dispatch) {
    dispatch(beginAddKpis());
    kpiApi
      .addKpis(kpiData, token, domain)
      .then((res) => {
        dispatch(addKpisSuccess());
      })
      .catch((error) => {
        dispatch(addKpisError());
        throw error;
      });
  };
}

function beginAddKpis() {
  return {
    type: types.BEGIN_ADD_KPIS,
    addingKpis: true,
    errorAddKpis: false,
  };
}

function addKpisSuccess() {
  return {
    type: types.ADD_KPIS_SUCCESS,
    addingKpis: false,
    errorAddKpis: false,
  };
}

function addKpisError() {
  return {
    type: types.ADD_KPIS_ERROR,
    addingKpis: false,
    errorAddKpis: true,
  };
}

export function loadCampaigns(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadCampaigns());
    kpiApi
      .loadCampaigns(token, domain)
      .then((res) => {
        dispatch(loadCampaignsSuccess(res));
      })
      .catch((error) => {
        dispatch(loadCampaignsError());
        throw error;
      });
  };
}

function beginLoadCampaigns() {
  return {
    type: types.BEGIN_LOAD_KPI_CAMPAIGNS,
    loadingCampaigns: true,
    errorCampaigns: false,
  };
}

function loadCampaignsSuccess(res) {
  return {
    type: types.LOAD_KPI_CAMPAIGNS_SUCCESS,
    loadingCampaigns: false,
    errorCampaigns: false,
    campaigns: res.data.marketing_campaigns,
  };
}

function loadCampaignsError() {
  return {
    type: types.LOAD_KPI_CAMPAIGNS_ERROR,
    loadingCampaigns: false,
    errorCampaigns: true,
  };
}

export function loadSources(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadSources());
    kpiApi
      .loadSources(token, domain)
      .then((res) => {
        dispatch(loadSourcesSuccess(res));
      })
      .catch((error) => {
        dispatch(loadSourcesError());
        throw error;
      });
  };
}

function beginLoadSources() {
  return {
    type: types.BEGIN_LOAD_KPI_SOURCES,
    loadingSources: true,
    errorSources: false,
  };
}

function loadSourcesSuccess(res) {
  return {
    type: types.LOAD_KPI_SOURCES_SUCCESS,
    loadingSources: false,
    errorSources: false,
    sources: res.data.sources,
  };
}

function loadSourcesError() {
  return {
    type: types.LOAD_KPI_SOURCES_ERROR,
    loadingSources: false,
    errorSources: true,
  };
}

export function loadCourses(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadCourses());
    kpiApi
      .loadCourses(token, domain)
      .then((res) => {
        dispatch(loadCoursesSuccess(res));
      })
      .catch((error) => {
        dispatch(loadCoursesError());
        throw error;
      });
  };
}

function beginLoadCourses() {
  return {
    type: types.BEGIN_LOAD_KPI_COURSES,
    loadingCourses: true,
    errorCourses: false,
  };
}

function loadCoursesSuccess(res) {
  return {
    type: types.LOAD_KPI_COURSES_SUCCESS,
    loadingCourses: false,
    errorCourses: false,
    courses: res.data.courses,
  };
}

function loadCoursesError() {
  return {
    type: types.LOAD_KPI_COURSES_ERROR,
    loadingCourses: false,
    errorCourses: true,
  };
}
