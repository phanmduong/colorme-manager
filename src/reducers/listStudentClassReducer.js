/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function listStudentClassReducer(state = initialState.listStudentClass, action) {
    switch (action.type) {
        case types.BEGIN_DATA_LIST_LIST_STUDENT_CLASS_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_LIST_STUDENT_CLASS_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                listStudentClassData: action.listStudentClassData
            });
        case types.LOAD_DATA_LIST_STUDENT_CLASS_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        default:
            return state;
    }

}