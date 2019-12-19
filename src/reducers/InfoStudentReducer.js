import initialState from './initialState';
import * as type from '../constants/actionTypes';

export function infoStudentReducer(state = initialState.infoStudent, action) {
  switch (action.type) {
    case type.INFO_STUDENT_SET_STUDENT_ID:
      return Object.assign({}, state, {
        studentId: action.studentId,
      });
    case type.BEGIN_LOAD_INFO_STUDENT_REGISTERS:
      return Object.assign({}, state, {
        isLoadingRegisters: action.isLoadingRegisters,
        errorRegisters: action.errorRegisters,
      });
    case type.LOAD_INFO_STUDENT_REGISTERS_SUCCESSFUL:
      return Object.assign({}, state, {
        registers: action.registers,
        isLoadingRegisters: action.isLoadingRegisters,
        errorRegisters: action.errorRegisters,
      });
    case type.LOAD_INFO_STUDENT_REGISTERS_ERROR:
      return Object.assign({}, state, {
        isLoadingRegisters: action.isLoadingRegisters,
        errorRegisters: action.errorRegisters,
      });
    case type.BEGIN_LOAD_CHANGE_CALL_STATUS:
      return Object.assign({}, state, {
        isLoadingChangeCallStatus: action.isLoadingChangeCallStatus,
        errorChangeCallStatus: action.errorChangeCallStatus,
      });
    case type.LOAD_CHANGE_CALL_STATUS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingChangeCallStatus: action.isLoadingChangeCallStatus,
        errorChangeCallStatus: action.errorChangeCallStatus,
      });
    case type.LOAD_CHANGE_CALL_STATUS_ERROR:
      return Object.assign({}, state, {
        isLoadingChangeCallStatus: action.isLoadingChangeCallStatus,
        errorChangeCallStatus: action.errorChangeCallStatus,
      });
    case type.BEGIN_LOAD_SUBMIT_MONEY:
      return Object.assign({}, state, {
        isLoadingSubmitMoney: action.isLoadingSubmitMoney,
        errorSubmitMoney: action.errorSubmitMoney,
      });
    case type.LOAD_SUBMIT_MONEY_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingSubmitMoney: action.isLoadingSubmitMoney,
        errorSubmitMoney: action.errorSubmitMoney,
      });
    case type.LOAD_SUBMIT_MONEY_ERROR:
      return Object.assign({}, state, {
        isLoadingSubmitMoney: action.isLoadingSubmitMoney,
        errorSubmitMoney: action.errorSubmitMoney,
      });
    default:
      return state;
  }
}
