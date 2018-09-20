/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function listStudentAttendanceReducer(state = initialState.listStudentAttendance, action) {
    switch (action.type) {
        case types.BEGIN_DATA_LIST_STUDENT_ATTENDANCE_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_LIST_STUDENT_ATTENDANCE_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                listStudentAttendanceData: action.listStudentAttendanceData
            });
        case types.LOAD_DATA_LIST_STUDENT_ATTENDANCE_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        default:
            return state;
    }

}