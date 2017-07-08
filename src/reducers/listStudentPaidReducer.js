/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function listStudentPaidReducer(state = initialState.listStudentPaid, action) {
    switch (action.type) {
        case types.BEGIN_DATA_LIST_STUDENT_PAID_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_LIST_STUDENT_PAID_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                listStudentPaidData: action.listStudentPaidData
            });
        case types.LOAD_DATA_LIST_STUDENT_PAID_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        default:
            return state;
    }

}