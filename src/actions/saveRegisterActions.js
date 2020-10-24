import * as types from '../constants/actionTypes';
import * as saveRegisterApi from '../apis/saveRegisterApi';

export function loadCourses(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadCourses());
    saveRegisterApi
      .loadCoursesApi(token, domain)
      .then(function (res) {
        dispatch(loadCoursesSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadCoursesError());
        throw error;
      });
  };
}

function beginLoadCourses() {
  return {
    type: types.BEGIN_LOAD_COURSES,
    isLoadingCourses: true,
    errorLoadingCourses: false,
  };
}

function loadCoursesSuccessful(res) {
  return {
    type: types.LOAD_COURSES_SUCCESSFUL,
    isLoadingCourses: false,
    errorLoadingCourses: false,
    courses: res.data,
  };
}

function loadCoursesError() {
  return {
    type: types.LOAD_COURSES_ERROR,
    isLoadingCourses: false,
    errorLoadingCourses: true,
  };
}

export function loadClasses(token, courseId, domain) {
  return function (dispatch) {
    dispatch(beginLoadClasses());
    saveRegisterApi
      .loadClassesApi(token, courseId, domain)
      .then(function (res) {
        dispatch(loadClassesSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadClassesError());
        throw error;
      });
  };
}

function beginLoadClasses() {
  return {
    type: types.BEGIN_LOAD_REGISTER_CLASSES,
    isLoadingClasses: true,
    errorLoadingClasses: false,
  };
}

function loadClassesSuccessful(res) {
  return {
    type: types.LOAD_REGISTER_CLASSES_SUCCESSFUL,
    isLoadingClasses: false,
    errorLoadingClasses: false,
    classes: res.data.data.classes,
  };
}

function loadClassesError() {
  return {
    type: types.LOAD_REGISTER_CLASSES_ERROR,
    isLoadingClasses: false,
    errorLoadingClasses: true,
  };
}

export function register(token, register, domain) {
  return function (dispatch) {
    dispatch(beginRegister());
    saveRegisterApi
      .saveRegisterApi(token, register, domain)
      .then(function (res) {
        dispatch(registerSuccessful());
      })
      .catch((error) => {
        dispatch(registerError());
        throw error;
      });
  };
}

function beginRegister() {
  return {
    type: types.BEGIN_REGISTER_STUDENT,
    isLoadingRegister: true,
    errorLoadingRegister: false,
  };
}

function registerSuccessful() {
  return {
    type: types.REGISTER_STUDENT_SUCCESSFUL,
    isLoadingRegister: false,
    errorLoadingRegister: false,
  };
}

function registerError() {
  return {
    type: types.REGISTER_STUDENT_ERROR,
    isLoadingRegister: false,
    errorLoadingRegister: true,
  };
}

export function loadCampaigns(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadCampaigns());
    saveRegisterApi
      .loadCampaigns(token, domain)
      .then(function (res) {
        dispatch(loadCampaignsSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadCampaignsError());
        throw error;
      });
  };
}

function beginLoadCampaigns() {
  return {
    type: types.BEGIN_LOAD_CAMPAIGNS,
    isLoadingCampaigns: true,
    errorLoadingCampaigns: false,
  };
}

function loadCampaignsSuccessful(res) {
  return {
    type: types.LOAD_CAMPAIGNS_SUCCESSFUL,
    isLoadingCampaigns: false,
    errorLoadingCampaigns: false,
    campaigns: res.data.marketing_campaigns,
  };
}

function loadCampaignsError() {
  return {
    type: types.LOAD_CAMPAIGNS_ERROR,
    isLoadingCampaigns: false,
    errorLoadingCampaigns: true,
  };
}

export function loadProvinces(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadProvinces());
    saveRegisterApi
      .loadProvinces(token, domain)
      .then(function (res) {
        dispatch(loadProvincesSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadProvincesError());
        throw error;
      });
  };
}

function beginLoadProvinces() {
  return {
    type: types.BEGIN_LOAD_PROVINCES,
    isLoadingProvinces: true,
    errorLoadingProvinces: false,
  };
}

function loadProvincesSuccessful(res) {
  return {
    type: types.LOAD_PROVINCES_SUCCESSFUL,
    isLoadingProvinces: false,
    errorLoadingProvinces: false,
    provinces: res.data.data.provinces,
  };
}

function loadProvincesError() {
  return {
    type: types.LOAD_PROVINCES_ERROR,
    isLoadingProvinces: false,
    errorLoadingProvinces: true,
  };
}

export function loadSources(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadSources());
    saveRegisterApi
      .loadSources(token, domain)
      .then(function (res) {
        dispatch(loadSourcesSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadSourcesError());
        throw error;
      });
  };
}

function beginLoadSources() {
  return {
    type: types.BEGIN_LOAD_SOURCES,
    isLoadingSources: true,
    errorLoadingSources: false,
  };
}

function loadSourcesSuccessful(res) {
  return {
    type: types.LOAD_SOURCES_SUCCESSFUL,
    isLoadingSources: false,
    errorLoadingSources: false,
    sources: res.data.sources,
  };
}

function loadSourcesError() {
  return {
    type: types.LOAD_SOURCES_ERROR,
    isLoadingSources: false,
    errorLoadingSources: true,
  };
}

export function loadStatuses(ref, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadStatuses());
    saveRegisterApi
      .loadStatuses(ref, token, domain)
      .then(function (res) {
        dispatch(loadStatusesSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadStatusesError());
        throw error;
      });
  };
}

function beginLoadStatuses() {
  return {
    type: types.BEGIN_LOAD_STATUSES,
    isLoadingStatuses: true,
    errorLoadingStatuses: false,
  };
}

function loadStatusesSuccessful(res) {
  return {
    type: types.LOAD_STATUSES_SUCCESSFUL,
    isLoadingStatuses: false,
    errorLoadingStatuses: false,
    statuses: res.data.statuses,
  };
}

function loadStatusesError() {
  return {
    type: types.LOAD_STATUSES_ERROR,
    isLoadingStatuses: false,
    errorLoadingStatuses: true,
  };
}

export function loadSalers(token, domain) {
  return function (dispatch) {
    dispatch(beginLoadSalers());
    saveRegisterApi
      .loadSalers(token, domain)
      .then(function (res) {
        dispatch(loadSalersSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadSalersError());
        throw error;
      });
  };
}

function beginLoadSalers() {
  return {
    type: types.BEGIN_LOAD_SALERS,
    isLoadingSalers: true,
    errorLoadingSalers: false,
  };
}

function loadSalersSuccessful(res) {
  return {
    type: types.LOAD_SALERS_SUCCESSFUL,
    isLoadingSalers: false,
    errorLoadingSalers: false,
    salers: res.data.data.salers,
  };
}

function loadSalersError() {
  return {
    type: types.LOAD_SALERS_ERROR,
    isLoadingSalers: false,
    errorLoadingSalers: true,
  };
}

export function loadFilterClasses(search, token, domain) {
  return function(dispatch) {
    dispatch(beginLoadFilterClasses());
    saveRegisterApi
      .loadFilterClasses(search, token, domain)
      .then(function(res) {
        dispatch(loadFilterClassesSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadFilterClassesError());
        throw error;
      });
  };
}

function beginLoadFilterClasses() {
  return {
    type: types.BEGIN_LOAD_FILTER_CLASSES,
    isLoadingFilterClasses: true,
    errorLoadingFilterClasses: false,
  };
}

function loadFilterClassesSuccessful(res) {
  return {
    type: types.LOAD_FILTER_CLASSES_SUCCESSFUL,
    isLoadingFilterClasses: false,
    errorLoadingFilterClasses: false,
    filterClasses: res.data,
  };
}

function loadFilterClassesError() {
  return {
    type: types.LOAD_FILTER_CLASSES_ERROR,
    isLoadingFilterClasses: false,
    errorLoadingFilterClasses: true,
  };
}
