import * as types from '../constants/actionTypes';
import * as formApi from '../apis/formApi';

import axios from 'axios';
import {Alert} from 'react-native';
let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function getForms(refreshing, page, search, token) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginLoadForms());
    } else {
      dispatch(beginRefreshForms());
    }
    formApi
      .getForms(sourceCancel, page, search, token)
      .then((res) => {
        dispatch(loadFormsSuccess(res));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(loadFormsError());
          throw error;
        }
      });
  };
}

function beginRefreshForms() {
  return {
    type: types.BEGIN_REFRESH_FORMS,
    refreshing: true,
    error: false,
  };
}

function beginLoadForms() {
  return {
    type: types.BEGIN_LOAD_FORMS,
    loading: true,
    error: false,
  };
}

function loadFormsSuccess(res) {
  return {
    type: types.LOAD_FORMS_SUCCESS,
    loading: false,
    error: false,
    forms: res.data.registerForms.items,
    refreshing: false,
    currentPage: res.data.registerForms.meta.current_page,
    totalPage: res.data.registerForms.meta.total_pages,
  };
}

function loadFormsError() {
  return {
    type: types.LOAD_FORMS_ERROR,
    loading: false,
    error: true,
    refreshing: false,
  };
}

function beginSearchForms(search) {
  return {
    type: types.BEGIN_SEARCH_FORMS,
    forms: [],
    currentPage: 1,
    totalPage: 1,
    search: search,
  };
}

export function refreshForms(search, token) {
  return function (dispatch) {
    dispatch(beginSearchForms(search));
    dispatch(getForms(true, 1, search, token));
  };
}

export function reset() {
  return {
    type: types.RESET_FORMS,
    forms: [],
    currentPage: 0,
    totalPage: 1,
    search: '',
  };
}

export function searchForms(search, token) {
  sourceCancel.cancel('Canceled by form api.');
  sourceCancel = CancelToken.source();
  return function (dispatch) {
    dispatch(beginSearchForms(search));
    dispatch(getForms(false, 1, search, token));
  };
}

export function createForm(data, token) {
  return function (dispatch) {
    dispatch(beginCreateForm());
    formApi
      .createForm(data, token)
      .then((res) => {
        dispatch(createFormSuccess(res));
        Alert.alert('Thông báo', 'Thêm form thành công');
      })
      .catch((error) => {
        dispatch(createFormError());
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {});
  };
}

function beginCreateForm() {
  return {
    type: types.BEGIN_CREATE_FORM,
    creating: true,
  };
}

function createFormSuccess(res) {
  return {
    type: types.CREATE_FORM_SUCCESS,
    creating: false,
    registerForm: res.data.registerForm,
  };
}

function createFormError() {
  return {
    type: types.CREATE_FORM_ERROR,
    creating: false,
  };
}

export function updateForm(data, token) {
  return function (dispatch) {
    dispatch(beginUpdateForm());
    formApi
      .updateForm(data, token)
      .then((res) => {
        dispatch(updateFormSuccess(res));
        Alert.alert('Thông báo', 'Sửa form thành công');
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        throw error;
      })
      .finally(() => {
        dispatch(updateFormComplete());
      });
  };
}

function beginUpdateForm() {
  return {
    type: types.BEGIN_UPDATE_FORM,
    updating: true,
  };
}

function updateFormSuccess(res) {
  return {
    type: types.UPDATE_FORM_SUCCESS,
    registerForm: res.data.registerForm,
  };
}

function updateFormComplete() {
  return {
    type: types.UPDATE_FORM_COMPLETE,
    updating: false,
  };
}
