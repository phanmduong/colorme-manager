/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function listStudentZeroReducer(state = initialState.listStudentZero, action) {
    switch (action.type) {
        case types.BEGIN_DATA_LIST_STUDENT_ZERO_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_LIST_STUDENT_ZERO_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                listStudentZeroData: action.listStudentZeroData
            });
        case types.LOAD_DATA_LIST_STUDENT_ZERO_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        default:
            return state;
    }

}