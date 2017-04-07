/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function attendanceStudentReducer(state = initialState.attendanceStudent, action) {
    switch (action.type) {
        case types.SELECT_BUTTON_ENTER_STUDENT_CODE:
            return Object.assign({}, state, {
                studentCode: action.studentCode
            });
        case types.BEGIN_GET_INFOR_STUDENT:
            return Object.assign({}, state, initialState.attendanceStudent , {
                isLoadingInfoStudent: action.isLoadingInfoStudent,
                errorLoad: action.errorLoad
            });
        case types.LOAD_GET_INFOR_STUDENT_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoadingInfoStudent: action.isLoadingInfoStudent,
                errorLoad: action.errorLoad,
                student: action.student
            });
        case types.LOAD_GET_INFOR_STUDENT_ERROR:
            return Object.assign({}, state, {
                isLoadingInfoStudent: action.isLoadingInfoStudent,
                errorLoad: action.errorLoad,
            });
        case types.BEGIN_POST_ATTENDANCE_STUDENT:
            return Object.assign({}, state, {
                isUpdatingAttendanceStudent: action.isUpdatingAttendanceStudent,
                errorUpdate: action.errorLoad
            });
        case types.LOAD_POST_ATTENDANCE_STUDENT_SUCCESSFUL:
            return Object.assign({}, state, {
                isUpdatingAttendanceStudent: action.isUpdatingAttendanceStudent,
                errorUpdate: action.errorLoad,
                attendance: action.attendance
            });
        case types.LOAD_POST_ATTENDANCE_STUDENT_ERROR:
            return Object.assign({}, state, {
                isUpdatingAttendanceStudent: action.isUpdatingAttendanceStudent,
                errorUpdate: action.errorLoad
            });
        default:
            return state;
    }

}