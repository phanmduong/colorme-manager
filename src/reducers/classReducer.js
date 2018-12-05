/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState'

export default function classReducer(state = initialState.class, action) {
    switch (action.type) {
        case types.BEGIN_DATA_CLASS_LOAD:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_CLASS_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error,
                classData: action.classData
            });
        case types.LOAD_DATA_CLASS_ERROR:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                error: action.error
            });
        case types.BEGIN_DATA_COURSES_LOAD:
            return Object.assign({}, state, {
                isLoadingCourse: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_COURSES_SUCCESSFUL:
            return Object.assign({}, state, {
                isLoadingCourse: action.isLoading,
                error: action.error,
                courseData: action.courseData
            });
        case types.LOAD_DATA_COURSES_ERROR:
            return Object.assign({}, state, {
                isLoadingCourse: action.isLoading,
                error: action.error
            });
        case types.SELECTED_CLASS_ID:
            return Object.assign({}, state, {
                selectedClassId: action.selectedClassId
            })
        default:
            return state;
    }

}