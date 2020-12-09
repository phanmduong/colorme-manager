import * as types from '../constants/actionTypes';
import * as formApi from '../apis/formApi';

import axios from 'axios';
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
