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
    default:
      return state;
  }
}
