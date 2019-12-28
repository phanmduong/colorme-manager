import * as types from '../constants/actionTypes';
import * as infoStudentApi from '../apis/infoStudentApi';

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
) {
  return function(dispatch) {
    dispatch(beginLoadSubmitMoney());
    infoStudentApi
      .submitMoney(register_id, money, code, note, payment_method, token)
      .then(function(res) {
        dispatch(loadSubmitMoneySuccessful());
        dispatch(loadRegisters(studentId, token));
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
