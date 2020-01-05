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
    case type.BEGIN_LOAD_STUDENT:
      return Object.assign({}, state, {
        isLoadingStudent: action.isLoadingStudent,
        errorStudent: action.errorStudent,
      });
    case type.LOAD_STUDENT_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingStudent: action.isLoadingStudent,
        errorStudent: action.errorStudent,
        student: action.student,
      });
    case type.LOAD_STUDENT_ERROR:
      return Object.assign({}, state, {
        isLoadingStudent: action.isLoadingStudent,
        errorStudent: action.errorStudent,
      });
    case type.BEGIN_UPLOAD_INFO_STUDENT_IMAGE:
      return Object.assign({}, state, {
        isUploadingImage: action.isUploadingImage,
        errorUploadingImage: action.errorUploadingImage,
      });
    case type.UPLOADING_INFO_STUDENT_IMAGE_SUCCESSFUL:
      return Object.assign({}, state, {
        isUploadingImage: action.isUploadingImage,
        errorUploadingImage: action.errorUploadingImage,
      });
    case type.UPLOADING_INFO_STUDENT_IMAGE_ERROR:
      return Object.assign({}, state, {
        isUploadingImage: action.isUploadingImage,
        errorUploadingImage: action.errorUploadingImage,
      });
    case type.BEGIN_UPDATING_STUDENT_PROFILE:
      return Object.assign({}, state, {
        isUpdatingProfile: action.isUpdatingProfile,
        errorUpdatingProfile: action.errorUpdatingProfile,
      });
    case type.UPDATING_STUDENT_PROFILE_SUCCESSFUL:
      return Object.assign({}, state, {
        isUpdatingProfile: action.isUpdatingProfile,
        errorUpdatingProfile: action.errorUpdatingProfile,
      });
    case type.UPDATING_STUDENT_PROFILE_ERROR:
      return Object.assign({}, state, {
        isUpdatingProfile: action.isUpdatingProfile,
        errorUpdatingProfile: action.errorUpdatingProfile,
      });
    case type.BEGIN_LOAD_HISTORY_CALLS:
      return Object.assign({}, state, {
        isLoadingHistoryCalls: action.isLoadingHistoryCalls,
        errorLoadingHistoryCalls: action.errorLoadingHistoryCalls,
      });
    case type.LOAD_HISTORY_CALLS_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingHistoryCalls: action.isLoadingHistoryCalls,
        errorLoadingHistoryCalls: action.errorLoadingHistoryCalls,
        historyCalls: action.historyCalls,
      });
    case type.LOAD_HISTORY_CALLS_ERROR:
      return Object.assign({}, state, {
        isLoadingHistoryCalls: action.isLoadingHistoryCalls,
        errorLoadingHistoryCalls: action.errorLoadingHistoryCalls,
      });
    case type.BEGIN_LOAD_HISTORY_COLLECT:
      return Object.assign({}, state, {
        isLoadingHistoryCollect: action.isLoadingHistoryCollect,
        errorLoadingHistoryCollect: action.errorLoadingHistoryCollect,
      });
    case type.LOAD_HISTORY_COLLECT_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingHistoryCollect: action.isLoadingHistoryCollect,
        errorLoadingHistoryCollect: action.errorLoadingHistoryCollect,
        historyCollect: action.historyCollect,
      });
    case type.LOAD_HISTORY_COLLECT_ERROR:
      return Object.assign({}, state, {
        isLoadingHistoryCollect: action.isLoadingHistoryCollect,
        errorLoadingHistoryCollect: action.errorLoadingHistoryCollect,
      });
    default:
      return state;
  }
}
