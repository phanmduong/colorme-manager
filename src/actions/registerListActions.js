/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';
import axios from 'axios';
let CancelToken = axios.CancelToken;
let sourceCancelAll = CancelToken.source();
let sourceCancelMy = CancelToken.source();

export function beginDataRegisterListLoadMy() {
  return {
    type: types.BEGIN_DATA_REGISTER_LIST_LOAD_MY,
    isLoadingMy: true,
    errorMy: false,
  };
}

export function loadDataRegisterListMy(token, page, search, salerId, baseId) {
  return function(dispatch) {
    dispatch(beginDataRegisterListLoadMy());
    studentApi
      .loadRegisterListApi(
        token,
        page,
        search,
        salerId,
        sourceCancelMy,
        '',
        '',
        '',
        '',
        baseId,
        '',
        '',
        '',
        '',
        '',
      )
      .then(function(res) {
        dispatch(loadDataSuccessfulMy(res, salerId));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(loadDataErrorMy());
          throw error;
        }
      });
  };
}

export function loadDataSuccessfulMy(res, salerId) {
  return {
    type: types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL_MY,
    registerListDataMy: res.data.registers,
    currentPageMy: res.data.paginator.current_page,
    totalPageMy: res.data.paginator.total_pages,
    isLoadingMy: false,
    errorMy: false,
    refreshingMy: false,
    salerId: salerId,
  };
}

export function loadDataErrorMy() {
  return {
    type: types.LOAD_DATA_REGISTER_LIST_ERROR_MY,
    isLoadingMy: false,
    errorMy: true,
    refreshingMy: false,
  };
}

export function updateFormAndLoadDataSearchMy(searchMy, salerId, token) {
  sourceCancelMy.cancel('Canceled by api register list (my).');
  sourceCancelMy = CancelToken.source();
  return dispatch => {
    dispatch(updateFormSearchMy(searchMy));
    dispatch(loadDataRegisterListMy(token, 1, searchMy, salerId));
  };
}

export function updateFormSearchMy(searchMy) {
  return {
    type: types.UPDATE_FORM_SEARCH_REGISTER_LIST_MY,
    searchMy: searchMy,
    currentPageMy: 1,
    totalPageMy: 1,
    registerListDataMy: [],
  };
}

export function refreshRegisterListMy(searchMy, token, salerId, baseId) {
  return dispatch => {
    dispatch(resetRegisterListMy());
    dispatch(loadDataRegisterListMy(token, 1, searchMy, salerId, baseId));
  };
}

function resetRegisterListMy() {
  return {
    type: types.RESET_PAGE_REGISTER_LIST_MY,
    currentPageMy: 1,
    totalPageMy: 1,
    registerListDataMy: [],
    refreshingMy: true,
  };
}

export function onSelectSalerId(salerId) {
  return {
    type: types.SELECT_REGISTER_LIST_SALER,
    salerId: salerId,
  };
}
