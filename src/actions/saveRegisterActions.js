import * as types from '../constants/actionTypes';
import * as saveRegisterApi from '../apis/saveRegisterApi';

export function loadCourses(token) {
  return function(dispatch) {
    dispatch(beginLoadCourses());
    saveRegisterApi
      .loadCoursesApi(token)
      .then(function(res) {
        dispatch(loadCoursesSuccessful(res));
      })
      .catch(error => {
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

export function loadClasses(token, courseId) {
  return function(dispatch) {
    dispatch(beginLoadClasses());
    saveRegisterApi
      .loadClassesApi(token, courseId)
      .then(function(res) {
        dispatch(loadClassesSuccessful(res));
      })
      .catch(error => {
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

export function register(token, register) {
  return function(dispatch) {
    dispatch(beginRegister());
    saveRegisterApi
      .saveRegisterApi(token, register)
      .then(function(res) {
        dispatch(registerSuccessful());
      })
      .catch(error => {
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

export function loadCampaigns(token) {
  return function(dispatch) {
    dispatch(beginLoadCampaigns());
    saveRegisterApi
      .loadCampaigns(token)
      .then(function(res) {
        dispatch(loadCampaignsSuccessful(res));
      })
      .catch(error => {
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

export function loadProvinces(token) {
  return function(dispatch) {
    dispatch(beginLoadProvinces());
    saveRegisterApi
      .loadProvinces(token)
      .then(function(res) {
        dispatch(loadProvincesSuccessful(res));
      })
      .catch(error => {
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
