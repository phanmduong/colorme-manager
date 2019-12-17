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
