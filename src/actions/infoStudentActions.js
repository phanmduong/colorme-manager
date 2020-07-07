import * as types from '../constants/actionTypes';
import * as infoStudentApi from '../apis/infoStudentApi';
import {refreshRegisterListMy} from './registerListActions';

export function setStudentId(studentId) {
  return {
    type: types.INFO_STUDENT_SET_STUDENT_ID,
    studentId: studentId,
  };
}

export function loadRegisters(studentId, token) {
  return function(dispatch) {
    dispatch(beginLoadRegisters());
    infoStudentApi
      .loadRegisters(studentId, token)
      .then(function(res) {
        dispatch(loadRegistersSuccessful(res));
      })
      .catch(error => {
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

function loadRegistersSuccessful(res) {
  return {
    type: types.LOAD_INFO_STUDENT_REGISTERS_SUCCESSFUL,
    isLoadingRegisters: false,
    errorRegisters: false,
    registers: res.data.data.registers,
  };
}

function loadRegistersError() {
  return {
    type: types.LOAD_INFO_STUDENT_REGISTERS_ERROR,
    isLoadingRegisters: false,
    errorRegisters: true,
  };
}

export function changeCallStatus(
  callStatus,
  studentId,
  telecallId,
  genId,
  note,
  callerId,
  appointmentPayment,
  dateTest,
  token,
) {
  return function(dispatch) {
    dispatch(beginLoadChangeCallStatus());
    infoStudentApi
      .changeCallStatusStudent(
        callStatus,
        studentId,
        telecallId,
        genId,
        note,
        callerId,
        appointmentPayment,
        dateTest,
        token,
      )
      .then(function(res) {
        dispatch(loadChangeCallStatusSuccessful());
      })
      .catch(error => {
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
  money,
  code,
  note,
  payment_method,
  studentId,
  token,
  searchMy,
  salerId,
  baseId,
  campaignId,
  paidStatus,
  classStatus,
  callStatus,
  bookmark,
  search_coupon,
  start_time,
  end_time,
  appointmentPayment,
  statusId,
  sourceId,
) {
  return function(dispatch) {
    dispatch(beginLoadSubmitMoney());
    infoStudentApi
      .submitMoney(register_id, money, code, note, payment_method, token)
      .then(function(res) {
        dispatch(loadSubmitMoneySuccessful());
        dispatch(loadRegisters(studentId, token));
        dispatch(
          refreshRegisterListMy(
            searchMy,
            token,
            salerId,
            baseId,
            campaignId,
            paidStatus,
            classStatus,
            callStatus,
            bookmark,
            search_coupon,
            start_time,
            end_time,
            appointmentPayment,
            statusId,
            sourceId,
          ),
        );
      })
      .catch(error => {
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

export function loadStudent(studentId, token) {
  return function(dispatch) {
    dispatch(beginLoadStudent());
    infoStudentApi
      .loadInfoStudent(studentId, token)
      .then(function(res) {
        dispatch(loadStudentSuccessful(res));
      })
      .catch(error => {
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

export function uploadImage(fileUri, studentId, imageField, token) {
  return function(dispatch) {
    dispatch(beginUploadingImage());
    infoStudentApi
      .uploadImage(fileUri, studentId, imageField, token)
      .then(function(res) {
        dispatch(uploadImageSuccessful());
        dispatch(loadStudent(studentId, token));
      })
      .catch(error => {
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

export function updateProfile(register, token) {
  return function(dispatch) {
    dispatch(beginUpdatingProfile());
    infoStudentApi
      .updateProfile(register, token)
      .then(function(res) {
        dispatch(updateProfileSuccessful());
        dispatch(loadStudent(register.id, token));
      })
      .catch(error => {
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

export function loadHistoryCalls(studentId, token) {
  return function(dispatch) {
    dispatch(beginLoadHistoryCalls());
    infoStudentApi
      .loadHistoryCalls(studentId, token)
      .then(function(res) {
        dispatch(loadHistoryCallsSuccessful(res));
      })
      .catch(error => {
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

function loadHistoryCallsSuccessful(res) {
  return {
    type: types.LOAD_HISTORY_CALLS_SUCCESSFUL,
    isLoadingHistoryCalls: false,
    errorLoadingHistoryCalls: false,
    historyCalls: res.data.data.history_calls,
  };
}

function loadHistoryCallsError() {
  return {
    type: types.LOAD_HISTORY_CALLS_ERROR,
    isLoadingHistoryCalls: false,
    errorLoadingHistoryCalls: true,
  };
}

export function loadHistoryCollect(studentId, token) {
  return function(dispatch) {
    dispatch(beginLoadHistoryCollect());
    infoStudentApi
      .loadHistoryCollect(studentId, token)
      .then(function(res) {
        dispatch(loadHistoryCollectSuccessful(res));
      })
      .catch(error => {
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

function loadHistoryCollectSuccessful(res) {
  return {
    type: types.LOAD_HISTORY_COLLECT_SUCCESSFUL,
    historyCollect: res.data.data,
    isLoadingHistoryCollect: false,
    errorLoadingHistoryCollect: false,
  };
}

function loadHistoryCollectError() {
  return {
    type: types.LOAD_HISTORY_COLLECT_ERROR,
    isLoadingHistoryCollect: false,
    errorLoadingHistoryCollect: true,
  };
}

export function loadProgress(studentId, token) {
  return function(dispatch) {
    dispatch(beginLoadProgress());
    infoStudentApi
      .loadProgress(studentId, token)
      .then(function(res) {
        dispatch(loadProgressSuccessful(res));
      })
      .catch(error => {
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

function loadProgressSuccessful(res) {
  return {
    type: types.LOAD_INFO_STUDENT_PROGRESS_SUCCESSFUL,
    isLoadingProgress: false,
    errorLoadingProgress: false,
    progress: res.data.data.progress,
  };
}

function loadProgressError() {
  return {
    type: types.LOAD_INFO_STUDENT_PROGRESS_ERROR,
    isLoadingProgress: false,
    errorLoadingProgress: true,
  };
}

export function changePassword(studentId, password, token) {
  return function(dispatch) {
    dispatch(beginChangePassword());
    infoStudentApi
      .changePassword(studentId, password, token)
      .then(function(res) {
        dispatch(changePasswordSuccessful());
      })
      .catch(error => {
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
