import * as types from '../constants/actionTypes';
import * as infoStudentApi from '../apis/infoStudentApi';
import {Alert} from 'react-native';

export function setStudentId(studentId) {
  return {
    type: types.INFO_STUDENT_SET_STUDENT_ID,
    studentId: studentId,
  };
}

export function loadRegisters(refreshing, studentId, token, domain) {
  return function (dispatch) {
    if (refreshing) {
      dispatch(beginRefreshRegisters());
    } else {
      dispatch(beginLoadRegisters());
    }
    infoStudentApi
      .loadRegisters(studentId, token, domain)
      .then(function (res) {
        dispatch(loadRegistersSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadRegistersError());
        throw error;
      });
  };
}

function beginLoadRegisters() {
  return {
    type: types.BEGIN_LOAD_INFO_STUDENT_REGISTERS,
    isLoadingRegisters: true,
    errorRegisters: false,
  };
}

function beginRefreshRegisters() {
  return {
    type: types.BEGIN_REFRESH_INFO_STUDENT_REGISTERS,
    refreshingRegisters: true,
    errorRegisters: false,
  };
}

function loadRegistersSuccessful(res) {
  return {
    type: types.LOAD_INFO_STUDENT_REGISTERS_SUCCESSFUL,
    isLoadingRegisters: false,
    errorRegisters: false,
    refreshingRegisters: false,
    registers: res.data.registers.items,
  };
}

function loadRegistersError() {
  return {
    type: types.LOAD_INFO_STUDENT_REGISTERS_ERROR,
    isLoadingRegisters: false,
    errorRegisters: true,
    refreshingRegisters: false,
  };
}

export function changeCallStatus(
  appointmentPayment,
  callBackTime,
  callStatus,
  note,
  statusId,
  studentId,
  teleId,
  token,
  domain,
) {
  return function (dispatch) {
    dispatch(beginLoadChangeCallStatus());
    infoStudentApi
      .changeCallStatusStudent(
        appointmentPayment,
        callBackTime,
        callStatus,
        note,
        statusId,
        studentId,
        teleId,
        token,
        domain,
      )
      .then(function (res) {
        Alert.alert('Thông báo', 'Ghi nhận thành công');
        dispatch(loadChangeCallStatusSuccessful());
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        dispatch(loadChangeCallStatusError());
        throw error;
      });
  };
}

function beginLoadChangeCallStatus() {
  return {
    type: types.BEGIN_LOAD_CHANGE_CALL_STATUS,
    isLoadingChangeCallStatus: true,
    errorChangeCallStatus: false,
  };
}

function loadChangeCallStatusSuccessful() {
  return {
    type: types.LOAD_CHANGE_CALL_STATUS_SUCCESSFUL,
    isLoadingChangeCallStatus: false,
    errorChangeCallStatus: false,
  };
}

function loadChangeCallStatusError() {
  return {
    type: types.LOAD_CHANGE_CALL_STATUS_ERROR,
    isLoadingChangeCallStatus: false,
    errorChangeCallStatus: true,
  };
}

export function submitMoney(
  register_id,
  actual_input_at,
  code,
  money,
  note,
  payment_method,
  received_book_at,
  token,
  domain,
) {
  return function (dispatch) {
    dispatch(beginLoadSubmitMoney());
    infoStudentApi
      .submitMoney(
        register_id,
        actual_input_at,
        code,
        money,
        note,
        payment_method,
        received_book_at,
        token,
        domain,
      )
      .then(function (res) {
        Alert.alert('Thông báo', 'Ghi nhận thành công');
        dispatch(loadSubmitMoneySuccessful());
      })
      .catch((error) => {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
        dispatch(loadSubmitMoneyError());
        throw error;
      });
  };
}

function beginLoadSubmitMoney() {
  return {
    type: types.BEGIN_LOAD_SUBMIT_MONEY,
    isLoadingSubmitMoney: true,
    errorSubmitMoney: false,
  };
}

function loadSubmitMoneySuccessful() {
  return {
    type: types.LOAD_SUBMIT_MONEY_SUCCESSFUL,
    isLoadingSubmitMoney: false,
    errorSubmitMoney: false,
  };
}

function loadSubmitMoneyError() {
  return {
    type: types.LOAD_SUBMIT_MONEY_ERROR,
    isLoadingSubmitMoney: false,
    errorSubmitMoney: true,
  };
}

export function loadStudent(studentId, token, domain) {
  return function (dispatch) {
    dispatch(beginLoadStudent());
    infoStudentApi
      .loadInfoStudent(studentId, token, domain)
      .then(function (res) {
        dispatch(loadStudentSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadStudentError());
        throw error;
      });
  };
}

function beginLoadStudent() {
  return {
    type: types.BEGIN_LOAD_STUDENT,
    isLoadingStudent: true,
    errorStudent: false,
  };
}

function loadStudentSuccessful(res) {
  return {
    type: types.LOAD_STUDENT_SUCCESSFUL,
    isLoadingStudent: false,
    errorStudent: false,
    student: res.data.data.student,
  };
}

function loadStudentError() {
  return {
    type: types.LOAD_STUDENT_SUCCESSFUL,
    isLoadingStudent: false,
    errorStudent: true,
  };
}

export function uploadImage(fileUri, studentId, imageField, token, domain) {
  return function (dispatch) {
    dispatch(beginUploadingImage());
    infoStudentApi
      .uploadImage(fileUri, studentId, imageField, token, domain)
      .then(function (res) {
        dispatch(uploadImageSuccessful());
        dispatch(loadStudent(studentId, token, domain));
      })
      .catch((error) => {
        dispatch(uploadImageError());
        throw error;
      });
  };
}

function beginUploadingImage() {
  return {
    type: types.BEGIN_UPLOAD_INFO_STUDENT_IMAGE,
    isUploadingImage: true,
    errorUploadingImage: false,
  };
}

function uploadImageSuccessful() {
  return {
    type: types.UPLOADING_INFO_STUDENT_IMAGE_SUCCESSFUL,
    isUploadingImage: false,
    errorUploadingImage: false,
  };
}

function uploadImageError() {
  return {
    type: types.UPLOADING_INFO_STUDENT_IMAGE_ERROR,
    isUploadingImage: false,
    errorUploadingImage: true,
  };
}

export function updateProfile(register, token, domain) {
  return function (dispatch) {
    dispatch(beginUpdatingProfile());
    infoStudentApi
      .updateProfile(register, token, domain)
      .then(function (res) {
        dispatch(updateProfileSuccessful());
        dispatch(loadStudent(register.id, token, domain));
      })
      .catch((error) => {
        dispatch(updateProfileError());
        throw error;
      });
  };
}

function beginUpdatingProfile() {
  return {
    type: types.BEGIN_UPDATING_STUDENT_PROFILE,
    isUpdatingProfile: true,
    errorUpdatingProfile: false,
  };
}

function updateProfileSuccessful() {
  return {
    type: types.UPDATING_STUDENT_PROFILE_SUCCESSFUL,
    isUpdatingProfile: false,
    errorUpdatingProfile: false,
  };
}

function updateProfileError() {
  return {
    type: types.UPDATING_STUDENT_PROFILE_ERROR,
    isUpdatingProfile: false,
    errorUpdatingProfile: true,
  };
}

export function loadHistoryCalls(refreshing, studentId, token, domain) {
  return function (dispatch) {
    if (refreshing) {
      dispatch(beginRefreshHistoryCalls());
    } else {
      dispatch(beginLoadHistoryCalls());
    }
    infoStudentApi
      .loadHistoryCalls(studentId, token, domain)
      .then(function (res) {
        dispatch(loadHistoryCallsSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadHistoryCallsError());
        throw error;
      });
  };
}

function beginLoadHistoryCalls() {
  return {
    type: types.BEGIN_LOAD_HISTORY_CALLS,
    isLoadingHistoryCalls: true,
    errorLoadingHistoryCalls: false,
  };
}

function beginRefreshHistoryCalls() {
  return {
    type: types.BEGIN_REFRESH_HISTORY_CALLS,
    refreshingHistoryCalls: true,
    errorLoadingHistoryCalls: false,
  };
}

function loadHistoryCallsSuccessful(res) {
  return {
    type: types.LOAD_HISTORY_CALLS_SUCCESSFUL,
    isLoadingHistoryCalls: false,
    errorLoadingHistoryCalls: false,
    refreshingHistoryCalls: false,
    historyCalls: res.data.tele_calls,
  };
}

function loadHistoryCallsError() {
  return {
    type: types.LOAD_HISTORY_CALLS_ERROR,
    isLoadingHistoryCalls: false,
    errorLoadingHistoryCalls: true,
    refreshingHistoryCalls: false,
  };
}

export function loadHistoryCollect(refreshing, studentId, token, domain) {
  return function (dispatch) {
    if (refreshing) {
      dispatch(beginRefreshHistoryCollect());
    } else {
      dispatch(beginLoadHistoryCollect());
    }
    infoStudentApi
      .loadHistoryCollect(studentId, token, domain)
      .then(function (res) {
        dispatch(loadHistoryCollectSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadHistoryCollectError());
        throw error;
      });
  };
}

function beginLoadHistoryCollect() {
  return {
    type: types.BEGIN_LOAD_HISTORY_COLLECT,
    isLoadingHistoryCollect: true,
    errorLoadingHistoryCollect: false,
  };
}

function beginRefreshHistoryCollect() {
  return {
    type: types.BEGIN_REFRESH_HISTORY_COLLECT,
    refreshingHistoryCollect: true,
    errorLoadingHistoryCollect: false,
  };
}

function loadHistoryCollectSuccessful(res) {
  return {
    type: types.LOAD_HISTORY_COLLECT_SUCCESSFUL,
    historyCollect: res.data.data,
    isLoadingHistoryCollect: false,
    errorLoadingHistoryCollect: false,
    refreshingHistoryCollect: false,
  };
}

function loadHistoryCollectError() {
  return {
    type: types.LOAD_HISTORY_COLLECT_ERROR,
    isLoadingHistoryCollect: false,
    errorLoadingHistoryCollect: true,
    refreshingHistoryCollect: false,
  };
}

export function loadProgress(refreshing, studentId, token, domain) {
  return function (dispatch) {
    if (refreshing) {
      dispatch(beginRefreshProgress());
    } else {
      dispatch(beginLoadProgress());
    }
    infoStudentApi
      .loadProgress(studentId, token, domain)
      .then(function (res) {
        dispatch(loadProgressSuccessful(res));
      })
      .catch((error) => {
        dispatch(loadProgressError());
        throw error;
      });
  };
}

function beginLoadProgress() {
  return {
    type: types.BEGIN_LOAD_INFO_STUDENT_PROGRESS,
    isLoadingProgress: true,
    errorLoadingProgress: false,
  };
}

function beginRefreshProgress() {
  return {
    type: types.BEGIN_REFRESH_INFO_STUDENT_PROGRESS,
    refreshingProgress: true,
    errorLoadingProgress: false,
  };
}

function loadProgressSuccessful(res) {
  return {
    type: types.LOAD_INFO_STUDENT_PROGRESS_SUCCESSFUL,
    isLoadingProgress: false,
    errorLoadingProgress: false,
    refreshingProgress: false,
    progress: res.data.data.progress,
  };
}

function loadProgressError() {
  return {
    type: types.LOAD_INFO_STUDENT_PROGRESS_ERROR,
    isLoadingProgress: false,
    errorLoadingProgress: true,
    refreshingProgress: false,
  };
}

export function changePassword(studentId, password, token, domain) {
  return function (dispatch) {
    dispatch(beginChangePassword());
    infoStudentApi
      .changePassword(studentId, password, token, domain)
      .then(function (res) {
        dispatch(changePasswordSuccessful());
      })
      .catch((error) => {
        dispatch(changePasswordError());
        throw error;
      });
  };
}

function beginChangePassword() {
  return {
    type: types.BEGIN_CHANGE_STUDENT_PASSWORD,
    isChangingPassword: true,
    errorPassword: false,
  };
}

function changePasswordSuccessful() {
  return {
    type: types.CHANGE_STUDENT_PASSWORD_SUCCESSFUL,
    isChangingPassword: false,
    errorPassword: false,
  };
}

function changePasswordError() {
  return {
    type: types.CHANGE_STUDENT_PASSWORD_ERROR,
    isChangingPassword: false,
    errorPassword: true,
  };
}
