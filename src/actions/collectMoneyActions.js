/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as studentApi from '../apis/studentApi';
import * as collectMoneyApi from '../apis/collectMoneyApi';
import axios from 'axios';
let CancelToken = axios.CancelToken;
let sourceCancel = CancelToken.source();

export function beginDataStudentListLoad() {
  return {
    type: types.BEGIN_DATA_STUDENT_LIST_COLLECT_MONEY_LOAD,
    isLoading: true,
    error: false,
  };
}

export function beginDataStudentListRefresh() {
  return {
    type: types.BEGIN_DATA_STUDENT_LIST_COLLECT_MONEY_REFRESH,
    refreshing: true,
    error: false,
  };
}

export function loadDataStudentList(refreshing, token, search, domain) {
  return function (dispatch) {
    if (!refreshing) {
      dispatch(beginDataStudentListLoad());
    } else {
      dispatch(beginDataStudentListRefresh());
    }
    studentApi
      .searchStudentRegisterApi(sourceCancel, search, token, domain)
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

export function refreshDataStudentList(token, search, domain) {
  return function (dispatch) {
    dispatch(updateFormSearch(search));
    dispatch(loadDataStudentList(true, token, search, domain));
  };
}

export function loadDataSuccessful(res) {
  return {
    type: types.LOAD_DATA_STUDENT_LIST_COLLECT_MONEY_SUCCESSFUL,
    studentListData: res.data.data.users,
    nextCode: res.data.data.next_code,
    nextWaitingCode: res.data.data.next_waiting_code,
    isLoading: false,
    error: false,
    refreshing: false,
  };
}

export function loadDataError() {
  return {
    type: types.LOAD_DATA_STUDENT_LIST_COLLECT_MONEY_ERROR,
    isLoading: false,
    error: true,
    refreshing: false,
  };
}

export function updateFormAndLoadDataSearch(search, token, domain) {
  sourceCancel.cancel('Canceled by api student list .');
  sourceCancel = CancelToken.source();
  return (dispatch) => {
    dispatch(updateFormSearch(search));
    dispatch(loadDataStudentList(false, token, search, domain));
  };
}

export function updateFormInfoMoney(formInfoMoney) {
  return {
    type: types.UPDATE_FORM_INFO_MONEY,
    formInfoMoney: formInfoMoney,
  };
}

export function updateFormSearch(search) {
  return {
    type: types.UPDATE_FORM_SEARCH_STUDENT_LIST_COLLECT_MONEY,
    search: search,
    studentListData: [],
  };
}

export function selectStudentClassRegister(student) {
  return {
    type: types.SELECTED_STUDENT_OF_STUDENT_LIST_COLLECT_MONEY,
    studentSelected: student,
  };
}

export function beginUpdateMoneyStudent() {
  return {
    type: types.BEGIN_UPDATE_MONEY_STUDENT_COLLECT_MONEY,
    isUpdatingData: true,
    errorUpdate: false,
    messageError: '',
  };
}

export function updateMoneyStudent(token, formInfoMoney, registerId, domain) {
  let {money, code, note, isReceivedCard} = formInfoMoney;
  console.log('money', formInfoMoney);
  return function (dispatch) {
    dispatch(beginUpdateMoneyStudent());
    collectMoneyApi
      .updateMoneyApi(
        token,
        registerId,
        money,
        code,
        note,
        isReceivedCard,
        domain,
      )
      .then(function (res) {
        dispatch(updateDataSuccessful(res));
      })
      .catch((error) => {
        dispatch(updateDataError(error.response.data));
      });
  };
}

export function updateDataSuccessful(res) {
  return {
    type: types.UPDATE_MONEY_STUDENT_COLLECT_MONEY_SUCCESSFUL,
    nextCode: res.data.next_code,
    nextWaitingCode: res.data.next_waiting_code,
    registerData: {
      code: res.data.data.code,
      money: res.data.data.money,
      id: res.data.data.id,
      paid_time: res.data.data.paid_time,
      received_id_card: res.data.data.received_id_card,
      is_paid: 1,
      note: res.data.data.note,
    },
    isUpdatingData: false,
    errorUpdate: false,
  };
}

export function updateDataError(res) {
  return {
    type: types.UPDATE_MONEY_STUDENT_COLLECT_MONEY_ERROR,
    isUpdatingData: false,
    errorUpdate: true,
    messageErrorUpdate: res.error,
  };
}
