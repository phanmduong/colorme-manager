/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as moneyTransferApi from '../apis/moneyTransferApi';
import axios from 'axios';
import React from 'react';
import {Alert} from 'react-native';
import * as alert from '../constants/alert';

let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function beginDataStaffListLoad() {
  return {
    type: types.BEGIN_DATA_STAFF_OF_MONEY_TRANSFER_LOAD,
    isLoadingStaffList: true,
    errorStaffList: false,
  };
}

export function beginDataStaffListRefresh() {
  return {
    type: types.BEGIN_DATA_STAFF_OF_MONEY_TRANSFER_REFRESH,
    refreshingStaffList: true,
    errorStaffList: false,
  };
}

export function loadDataStaffList(refreshing, token, page, search, domain) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginDataStaffListLoad());
    } else {
      dispatch(beginDataStaffListRefresh());
    }
    moneyTransferApi
      .searchStaffApi(token, search, page, sourceCancel, domain)
      .then(function (res) {
        dispatch(loadDataStaffSuccessful(res));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(loadDataStaffError());
          throw error;
        }
      });
  };
}

export function refreshDataStaffList(token, search, domain) {
  return function (dispatch) {
    dispatch(updateFormSearchStaff(search));
    dispatch(loadDataStaffList(true, token, 1, search, domain));
  };
}

export function loadDataStaffSuccessful(res) {
  return {
    type: types.LOAD_DATA_STAFF_OF_MONEY_TRANSFER_SUCCESSFUL,
    staffListData: res.data.data,
    currentPageStaffList: res.data.paginator.current_page,
    totalPageStaffList: res.data.paginator.total_pages,
    isLoadingStaffList: false,
    errorStaffList: false,
    refreshingStaffList: false,
  };
}

export function loadDataStaffError() {
  return {
    type: types.LOAD_DATA_STAFF_OF_MONEY_TRANSFER_ERROR,
    isLoadingStaffList: false,
    errorStaffList: true,
    refreshingStaffList: false,
  };
}

export function updateFormAndLoadDataSearchStaff(search, token, domain) {
  sourceCancel.cancel('Canceled by api register list ().');
  sourceCancel = CancelToken.source();
  return (dispatch) => {
    dispatch(updateFormSearchStaff(search));
    dispatch(loadDataStaffList(false, token, 1, search, domain));
  };
}

export function updateFormSearchStaff(search) {
  return {
    type: types.UPDATE_FORM_SEARCH_STAFF_LIST,
    searchStaff: search,
    currentPageStaffList: 1,
    totalPageStaffList: 1,
    staffListData: [],
  };
}

export function changeSegmentMoneyTransfer(segment) {
  return {
    type: types.CHANGE_SEGMENT_MONEY_TRANSFER,
    segment: segment,
  };
}

export function beginDataHistoryTransactionLoad() {
  return {
    type: types.BEGIN_DATA_HISTORY_TRANSACTION_LOAD,
    isLoadingHistoryTransaction: true,
    errorHistoryTransaction: false,
  };
}

export function loadDataHistoryTransaction(token, page, domain) {
  return function (dispatch) {
    dispatch(beginDataHistoryTransactionLoad());
    moneyTransferApi
      .getTransactionApi(token, page, domain)
      .then(function (res) {
        dispatch(loadDataHistoryTransactionSuccessful(res));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(loadDataHistoryTransactionError());
          throw error;
        }
      });
  };
}

export function loadDataHistoryTransactionSuccessful(res) {
  return {
    type: types.LOAD_DATA_HISTORY_TRANSACTION_SUCCESSFUL,
    transactionListData: res.data.data.transactions,
    currentMoney: res.data.data.current_money,
    isLoadingTransaction: res.data.data.status === 2,
    currentPageHistoryTransaction: res.data.paginator.current_page,
    totalPageHistoryTransaction: res.data.paginator.total_pages,
    isLoadingHistoryTransaction: false,
    errorHistoryTransaction: false,
  };
}

export function loadDataHistoryTransactionError() {
  return {
    type: types.LOAD_DATA_HISTORY_TRANSACTION_ERROR,
    isLoadingHistoryTransaction: false,
    errorHistoryTransaction: true,
  };
}

export function beginTransaction() {
  return {
    type: types.BEGIN_TRANSACTION,
    isLoadingTransaction: true,
    errorTransaction: false,
  };
}

export function updateTransaction(receiverId, token, domain) {
  return function (dispatch) {
    dispatch(beginTransaction());
    moneyTransferApi
      .postTransactionApi(receiverId, token, domain)
      .then(function (res) {
        dispatch(transactionSuccessful());
      })
      .catch((error) => {
        // if (axios.isCancel(error)) {
        //     console.log('Request canceled', error.message);
        // } else {
        //     dispatch(transactionError());
        //     throw (error);
        // }
      });
  };
}

export function duongtransactionSuccessful() {
  return {
    type: types.TRANSACTION_SUCCESSFUL,
    isLoadingTransaction: true,
    errorTransaction: false,
  };
}

export function transactionError() {
  return {
    type: types.TRANSACTION_ERROR,
    isLoadingTransaction: false,
    errorTransaction: true,
  };
}

export function beginConfirmTransaction(transactionId) {
  return {
    type: types.BEGIN_CONFIRM_TRANSACTION,
    isLoadingConfirmTransaction: true,
    errorConfirmTransaction: false,
    transactionId: transactionId,
  };
}

export function updateConfirmTransaction(transactionId, status, token, domain) {
  return function (dispatch) {
    dispatch(beginConfirmTransaction());
    moneyTransferApi
      .conformTransactionApi(transactionId, status, token, domain)
      .then(function (res) {
        dispatch(confirmTransactionSuccessful(transactionId));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch(confirmTransactionError(transactionId));
          throw error;
        }
      });
  };
}

export function confirmTransactionSuccessful(transactionId) {
  return {
    type: types.CONFIRM_TRANSACTION_SUCCESSFUL,
    isLoadingConfirmTransaction: true,
    errorConfirmTransaction: false,
    transactionId: transactionId,
  };
}

export function updateHistoryTransactionWithSocket(token, domain) {
  return function (dispatch) {
    dispatch(setDataUpdateHistoryTransactionWithSocket());
    dispatch(loadDataHistoryTransaction(token, 1, domain));
  };
}

export function setDataUpdateHistoryTransactionWithSocket() {
  return {
    type: types.UPDATE_HISTORY_TRANSACTION_SOCKET,
    transactionListData: [],
    isLoadingHistoryTransaction: true,
    errorHistoryTransaction: false,
  };
}

export function confirmTransactionError(transactionId) {
  Alert.alert('Thông báo', alert.CONFIRM_TRANSACTION_ERROR);
  return {
    type: types.CONFIRM_TRANSACTION_ERROR,
    isLoadingConfirmTransaction: false,
    errorConfirmTransaction: true,
    transactionId: transactionId,
  };
}
