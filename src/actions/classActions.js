/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as classApi from '../apis/classApi';
import * as analyticsApi from '../apis/analyticsApi';

export function beginDataClassLoad() {
  return {
    type: types.BEGIN_DATA_CLASS_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataClass(baseId, genId, token) {
  return function(dispatch) {
    dispatch(beginDataClassLoad());
    analyticsApi
      .loadDashboard(baseId, genId, token)
      .then(function(res) {
        dispatch(loadDataSuccessful(res));
      })
      .catch(error => {
        dispatch(loadDataError());
        throw error;
      });
  };
}

export function loadDataSuccessful(res) {
  return {
    type: types.LOAD_DATA_CLASS_SUCCESSFUL,
    classData: res.data.classes,
    isLoading: false,
    error: false,
  };
}

export function beginDataClassRefresh() {
  return {
    type: types.BEGIN_DATA_CLASS_REFRESH,
    isRefreshing: true,
    error: false,
  };
}

export function refreshDataClass(baseId, genId, token) {
  return function(dispatch) {
    dispatch(beginDataClassRefresh());
    analyticsApi
      .loadDashboard(baseId, genId, token)
      .then(function(res) {
        dispatch(refreshDataSuccessful(res));
      })
      .catch(error => {
        dispatch(refreshDataError());
        throw error;
      });
  };
}

export function refreshDataSuccessful(res) {
  return {
    type: types.REFRESH_DATA_CLASS_SUCCESSFUL,
    classData: res.data.classes,
    isRefreshing: false,
    error: false,
  };
}

export function refreshDataError() {
  return {
    type: types.REFRESH_DATA_CLASS_ERROR,
    isRefreshing: false,
    error: false,
  };
}

export function beginDataCourseLoad() {
  return {
    type: types.BEGIN_DATA_COURSES_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataCourse(token) {
  return function(dispatch) {
    dispatch(beginDataCourseLoad());
    classApi
      .loadCourseApi(token)
      .then(function(res) {
        dispatch(loadDataCourseSuccessful(res));
      })
      .catch(error => {
        dispatch(loadDataCourseError());
        throw error;
      });
  };
}

export function loadDataError() {
  return {
    type: types.LOAD_DATA_CLASS_ERROR,
    isLoading: false,
    error: false,
  };
}

export function loadDataCourseSuccessful(res) {
  return {
    type: types.LOAD_DATA_COURSES_SUCCESSFUL,
    courseData: res.data,
    isLoading: false,
    error: false,
  };
}

export function loadDataCourseError() {
  return {
    type: types.LOAD_DATA_COURSES_ERROR,
    isLoading: false,
    error: false,
  };
}

export function selectedClassId(id) {
  return {
    type: types.SELECTED_CLASS_ID,
    selectedClassId: id,
  };
}

function beginLoadBase() {
  return {
    type: types.BEGIN_LOAD_BASE,
    isLoadingBase: true,
    errorLoadingBase: false,
  };
}

function loadBaseSuccessful(res) {
  return {
    type: types.LOAD_BASE_SUCCESSFUL,
    isLoadingBase: false,
    errorLoadingBase: false,
    baseData: res.data.bases,
  };
}

function loadBaseError() {
  return {
    type: types.LOAD_BASE_ERROR,
    isLoadingBase: false,
    errorLoadingBase: true,
  };
}

export function loadBaseData(token) {
  return function(dispatch) {
    dispatch(beginLoadBase());
    classApi
      .loadBaseData(token)
      .then(function(res) {
        dispatch(loadBaseSuccessful(res));
      })
      .catch(error => {
        dispatch(loadBaseError());
        throw error;
      });
  };
}
