/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as classApi from '../apis/classApi';
import axios from 'axios';

let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function beginDataClassLoad() {
  return {
    type: types.BEGIN_DATA_CLASS_LOAD,
    isLoading: true,
    error: false,
  };
}

export function loadDataClass(
  refreshing,
  search,
  courseId,
  page,
  genId,
  baseId,
  token,
) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginDataClassLoad());
    } else {
      dispatch(beginDataClassRefresh());
    }
    classApi
      .loadClassApi(
        sourceCancel,
        search,
        courseId,
        page,
        genId,
        baseId,
        token,
      )
      .then(function (res) {
        dispatch(loadDataSuccessful(res));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(loadDataError());
          throw error;
        }
      });
  };
}

export function loadDataSuccessful(res) {
  return {
    type: types.LOAD_DATA_CLASS_SUCCESSFUL,
    classData: res.data.classes,
    isLoading: false,
    error: false,
    currentPage: res.data.paginator.current_page,
    totalPage: res.data.paginator.total_pages,
    isRefreshing: false,
  };
}

export function beginDataClassRefresh() {
  return {
    type: types.BEGIN_DATA_CLASS_REFRESH,
    isRefreshing: true,
    error: false,
  };
}

export function refreshDataClass(
  search,
  courseId,
  genId,
  baseId,
  token,
) {
  return function (dispatch) {
    dispatch(beginSearchClass(search));
    dispatch(
      loadDataClass(true, search, courseId, 1, genId, baseId, token),
    );
  };
}

function beginSearchClass(search) {
  return {
    type: types.BEGIN_SEARCH_CLASS,
    search: search,
    currentPage: 1,
    totalPage: 1,
    classData: [],
  };
}

export function searchClass(search, courseId, genId, baseId, token) {
  sourceCancel.cancel('Canceled by class api.');
  sourceCancel = CancelToken.source();
  return function (dispatch) {
    dispatch(beginSearchClass(search));
    dispatch(
      loadDataClass(false, search, courseId, 1, genId, baseId, token),
    );
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
  return function (dispatch) {
    dispatch(beginDataCourseLoad());
    classApi
      .loadCourseApi(token)
      .then(function (res) {
        dispatch(loadDataCourseSuccessful(res));
      })
      .catch((error) => {
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
    isRefreshing: false,
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

export function selectedBaseId(id) {
  return {
    type: types.SELECTED_CLASS_BASE_ID,
    selectedBaseId: id,
  };
}

export function selectedGenId(id) {
  return {
    type: types.SELECTED_CLASS_GEN_ID,
    selectedGenId: id,
  };
}

export function selectedCourseId(id) {
  return {
    type: types.SELECTED_CLASS_COURSE_ID,
    selectedCourseId: id,
  };
}

export function reset() {
  return {
    type: types.RESET_CLASS,
    classData: [],
    selectedGenId: -1,
    currentPage: 0,
    totalPage: 1,
    search: '',
    selectedBaseId: -1,
    selectedCourseId: -1,
  }
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
  return function (dispatch) {
    dispatch(beginLoadBase());
    classApi
      .loadBaseData(token)
      .then(function (res) {
        dispatch(loadBaseSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadBaseError());
        throw error;
      });
  };
}

export function infoCreateClass(token) {
  return function (dispatch) {
    dispatch(beginLoadInfoCreateClass());
    classApi
      .infoCreateClass(token)
      .then(function (res) {
        dispatch(loadInfoCreateClassSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadInfoCreateClassError());
        throw error;
      });
  };
}

function beginLoadInfoCreateClass() {
  return {
    type: types.BEGIN_LOAD_INFO_CREATE_CLASS,
    loadingInfoCreateClass: true,
    errorInfoCreateClass: false,
  };
}

function loadInfoCreateClassSuccessful(res) {
  return {
    type: types.LOAD_INFO_CREATE_CLASS_SUCCESSFUL,
    loadingInfoCreateClass: false,
    errorInfoCreateClass: false,
    schedules: res.data.data.schedules,
    rooms: res.data.data.rooms,
    courses: res.data.data.courses,
    genData: res.data.data.gens,
    staffs: res.data.data.staffs,
  };
}

function loadInfoCreateClassError() {
  return {
    type: types.LOAD_INFO_CREATE_CLASS_ERROR,
    loadingInfoCreateClass: false,
    errorInfoCreateClass: true,
  };
}

export function addClass(classData, baseId, genId, token) {
  return function (dispatch) {
    dispatch(beginAddClass());
    classApi
      .addClass(classData, token)
      .then(function (res) {
        dispatch(addClassSuccessful());
        dispatch(loadDataClass(baseId, genId, token));
      })
      .catch((error) => {
        dispatch(addClassError());
        throw error;
      });
  };
}

function beginAddClass() {
  return {
    type: types.BEGIN_ADD_CLASS,
    isUpdatingClass: true,
    errorUpdatingClass: false,
  };
}

function addClassSuccessful() {
  return {
    type: types.ADD_CLASS_SUCCESSFUL,
    isUpdatingClass: false,
    errorUpdatingClass: false,
  };
}

function addClassError() {
  return {
    type: types.ADD_CLASS_ERROR,
    isUpdatingClass: false,
    errorUpdatingClass: true,
  };
}

export function loadClassInfo(classId, token) {
  return function (dispatch) {
    dispatch(beginLoadClassInfo());
    classApi
      .loadClassInfo(classId, token)
      .then(function (res) {
        dispatch(loadClassInfoSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadClassInfoError());
        throw error;
      });
  };
}

function beginLoadClassInfo() {
  return {
    type: types.BEGIN_LOAD_CLASS_INFO,
    loadingClassInfo: true,
    errorClassInfo: false,
  };
}

function loadClassInfoSuccessful(res) {
  return {
    type: types.LOAD_CLASS_INFO_SUCCESSFUL,
    loadingClassInfo: false,
    errorClassInfo: false,
    classInfo: res.data.data.class,
  };
}

function loadClassInfoError() {
  return {
    type: types.LOAD_CLASS_INFO_ERROR,
    loadingClassInfo: false,
    errorClassInfo: true,
  };
}

export function changeClassStatus(classId, token) {
  return function (dispatch) {
    dispatch(beginChangeClassStatus());
    classApi
      .changeClassStatus(classId, token)
      .then(function (res) {
        dispatch(changeClassStatusSuccessful());
      })
      .catch((error) => {
        dispatch(changeClassStatusError());
        throw error;
      });
  };
}

function beginChangeClassStatus() {
  return {
    type: types.BEGIN_CHANGE_CLASS_STATUS,
    changingClassStatus: true,
    errorClassStatus: false,
  };
}

function changeClassStatusSuccessful() {
  return {
    type: types.CHANGE_CLASS_STATUS_SUCCESSFUL,
    changingClassStatus: false,
    errorClassStatus: false,
  };
}

function changeClassStatusError() {
  return {
    type: types.CHANGE_CLASS_STATUS_ERROR,
    changingClassStatus: false,
    errorClassStatus: true,
  };
}
