/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function attendanceStudentReducer(
  state = initialState.attendanceStudent,
  action,
) {
  switch (action.type) {
    case types.SCANNED_QR_CODE:
      return Object.assign({}, state, {
        studentCode: action.studentCode,
      });
    case types.BEGIN_GET_INFOR_STUDENT:
      return Object.assign({}, state, initialState.attendanceStudent, {
        isLoadingInfoStudent: action.isLoadingInfoStudent,
        errorLoad: action.errorLoad,
      });
    case types.LOAD_GET_INFOR_STUDENT_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoadingInfoStudent: action.isLoadingInfoStudent,
        errorLoad: action.errorLoad,
        student: action.student,
        classStudent: action.classStudent,
      });
    case types.LOAD_GET_INFOR_STUDENT_ERROR:
      return Object.assign({}, state, {
        isLoadingInfoStudent: action.isLoadingInfoStudent,
        errorLoad: action.errorLoad,
        messageError: action.messageError,
      });
    case types.BEGIN_POST_ATTENDANCE_STUDENT:
      return Object.assign({}, state, {
        isUpdatingAttendanceStudent: action.isUpdatingAttendanceStudent,
        errorUpdate: action.errorLoad,
      });
    case types.LOAD_POST_ATTENDANCE_STUDENT_SUCCESSFUL:
      return Object.assign({}, state, {
        isUpdatingAttendanceStudent: action.isUpdatingAttendanceStudent,
        errorUpdate: action.errorLoad,
        statusRequestUpdated: action.statusRequestUpdated,
        attendance: action.attendance,
        message: action.message,
      });
    case types.LOAD_POST_ATTENDANCE_STUDENT_ERROR:
      return Object.assign({}, state, {
        isUpdatingAttendanceStudent: action.isUpdatingAttendanceStudent,
        errorUpdate: action.errorLoad,
      });
    case types.BEGIN_UNBLOCK_STUDENT:
      return {
        ...state,
        isChangeStatusBlocking: action.isChangeStatusBlocking,
      };
    case types.LOAD_UNBLOCKING_STUDENT:
      return {
        ...state,
        ...{
          isChangeStatusBlocking: action.isChangeStatusBlocking,
          student: {
            ...state.student,
            is_blocked: action.student.is_blocked,
          },
        },
      };
    case types.ERROR_UNBLOCKING_STUDENT:
      return {
        ...state,
        isChangeStatusBlocking: action.isChangeStatusBlocking,
      };
    case types.BEGIN_UPLOAD_IMAGE_STUDENT:
      return {
        ...state,
        ...{
          student: {
            ...state.student,
            ['isUploading_' + action.imageField]: true,
          },
        },
      };
    case types.UPLOAD_IMAGE_STUDENT:
      return {
        ...state,
        ...{
          student: {
            ...state.student,
            ['isUploading_' + action.imageField]: false,
            [action.imageField]: action.image_url,
          },
        },
      };
    case types.BEGIN_CHANGE_CLASS_ATTENDANCE:
      return Object.assign({}, state, {
        isChangingClassAttendance: action.isChangingClassAttendance,
        errorClassAttendance: action.errorClassAttendance,
      });
    case types.CHANGE_CLASS_ATTENDANCE_SUCCESSFUL:
      return Object.assign({}, state, {
        isChangingClassAttendance: action.isChangingClassAttendance,
        errorClassAttendance: action.errorClassAttendance,
      });
    case types.CHANGE_CLASS_ATTENDANCE_ERROR:
      return Object.assign({}, state, {
        isChangingClassAttendance: action.isChangingClassAttendance,
        errorClassAttendance: action.errorClassAttendance,
      });
    default:
      return state;
  }
}
